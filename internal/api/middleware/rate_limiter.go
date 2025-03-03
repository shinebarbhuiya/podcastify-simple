package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/labstack/echo/v4"
)

type WindowRateLimiter struct {
	requests map[string][]time.Time
	limit    int           // requests per window
	window   time.Duration // window duration
	mu       sync.RWMutex
}

func NewRateLimiter(limit int, window time.Duration) *WindowRateLimiter {
	return &WindowRateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
}

func (r *WindowRateLimiter) Limit() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ip := c.RealIP()
			now := time.Now()

			r.mu.Lock()
			defer r.mu.Unlock()

			// Clean old requests
			if times, exists := r.requests[ip]; exists {
				var valid []time.Time
				for _, t := range times {
					if now.Sub(t) <= r.window {
						valid = append(valid, t)
					}
				}
				r.requests[ip] = valid
			}

			// Check limit
			if len(r.requests[ip]) >= r.limit {
				return c.JSON(http.StatusTooManyRequests, map[string]interface{}{
					"error": "Rate limit exceeded",
					"details": map[string]interface{}{
						"limit":       r.limit,
						"window":      r.window.String(),
						"retry_after": r.window.Seconds() - now.Sub(r.requests[ip][0]).Seconds(),
					},
				})
			}

			// Add new request
			r.requests[ip] = append(r.requests[ip], now)
			return next(c)
		}
	}
}
