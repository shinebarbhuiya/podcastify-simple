package routes

import (
	"time"

	"github.com/labstack/echo/v4"
	"github.com/shinebarbhuiya/simple-podcast/internal/api/handlers"
	"github.com/shinebarbhuiya/simple-podcast/internal/api/middleware"
	"github.com/shinebarbhuiya/simple-podcast/internal/client"
	"github.com/shinebarbhuiya/simple-podcast/internal/config"
)

func RegisterRoutes(e *echo.Echo, cfg *config.Config) {
	// Initialize clients
	podcastClient := client.NewPodcastClient(cfg.PodcastServiceURL, cfg.Timeout)

	// Initialize handlers
	podcastHandler := handlers.NewPodcastHandler(podcastClient)

	// Initialize custom middleware
	rateLimiter := middleware.NewRateLimiter(cfg.RateLimit, time.Duration(cfg.RateWindow)*time.Minute)

	// API v1 group
	v1 := e.Group("/api/v1")

	// Apply rate limiting to all API routes
	v1.Use(rateLimiter.Limit())

	// Podcast routes
	v1.GET("/podcasts", podcastHandler.GetPodcasts)

	// Health check
	e.GET("/health", podcastHandler.HealthCheck)

	// Home route
	e.GET("/", podcastHandler.Home)
}
