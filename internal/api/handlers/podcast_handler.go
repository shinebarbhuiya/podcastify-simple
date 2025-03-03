package handlers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/shinebarbhuiya/simple-podcast/internal/client"
	"github.com/shinebarbhuiya/simple-podcast/internal/models"
)

type PodcastHandler struct {
	client *client.PodcastClient
}

func NewPodcastHandler(client *client.PodcastClient) *PodcastHandler {
	return &PodcastHandler{client: client}
}

func (h *PodcastHandler) GetPodcasts(c echo.Context) error {
	// Parse query parameters
	params := models.SearchParams{
		Search:       c.QueryParam("search"),
		Title:        c.QueryParam("title"),
		CategoryName: c.QueryParam("categoryName"),
	}

	// Handle both pagination formats (page/limit and p/l)
	page, _ := strconv.Atoi(c.QueryParam("page"))
	if page == 0 {
		page, _ = strconv.Atoi(c.QueryParam("p"))
	}
	params.Page = page

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	if limit == 0 {
		limit, _ = strconv.Atoi(c.QueryParam("l"))
	}
	params.Limit = limit

	// Call the podcast service
	podcasts, err := h.client.GetPodcasts(params)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch podcasts",
		})
	}

	// Return response
	response := models.PodcastsResponse{
		Podcasts: podcasts,
		Total:    len(podcasts),
		Page:     params.Page,
		Limit:    params.Limit,
	}

	return c.JSON(http.StatusOK, response)
}

func (h *PodcastHandler) HealthCheck(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{"status": "healthy"})
}

func (h *PodcastHandler) Home(c echo.Context) error {
	response := map[string]interface{}{
		"name":        "Podcastify API",
		"version":     "1.0.0",
		"description": "A podcast discovery API service built with Go and Echo framework",
		"assignment": map[string]string{
			"for":     "Paul Xue @Codebase",
			"author":  "Shine Barbhuiya",
			"purpose": "Technical Assessment",
		},
		"features": []string{
			"Podcast discovery and search",
			"Category-based filtering",
			"Pagination support",
			"Rate limiting",
			"CORS enabled",
		},
		"api": map[string]interface{}{
			"base_url": "/api/v1",
			"endpoints": map[string]interface{}{
				"GET /podcasts": map[string]interface{}{
					"description": "Get a list of podcasts with filtering and pagination",
					"query_parameters": map[string]interface{}{
						"search": map[string]string{
							"type":        "string",
							"description": "Search podcasts by title or description",
							"required":    "false",
							"example":     "trevor",
						},
						"title": map[string]string{
							"type":        "string",
							"description": "Filter podcasts by exact title match",
							"required":    "false",
							"example":     "Trevor Noah",
						},
						"categoryName": map[string]string{
							"type":        "string",
							"description": "Filter podcasts by category name",
							"required":    "false",
							"example":     "Comedy",
						},
						"page": map[string]string{
							"type":        "integer",
							"description": "Page number for pagination",
							"default":     "1",
							"alias":       "p",
						},
						"limit": map[string]string{
							"type":        "integer",
							"description": "Number of items per page",
							"default":     "9",
							"alias":       "l",
						},
					},
					"response_format": map[string]interface{}{
						"podcasts": []map[string]string{
							{
								"id":            "string",
								"title":         "string",
								"description":   "string",
								"publisherName": "string",
								"categoryName":  "string",
								"isExclusive":   "boolean",
							},
						},
						"total": "integer - total number of podcasts",
						"page":  "integer - current page number",
						"limit": "integer - items per page",
					},
				},
			},
		},
		"rate_limiting": map[string]interface{}{
			"limit":      100,
			"window":     "1 minute",
			"error_code": 429,
			"error_format": map[string]interface{}{
				"error": "Rate limit exceeded",
				"details": map[string]interface{}{
					"limit":       "requests per window",
					"window":      "time window duration",
					"retry_after": "seconds until next available request",
				},
			},
		},
		"example_requests": []string{
			"/api/v1/podcasts?search=tech&page=1&limit=9",
			"/api/v1/podcasts?categoryName=Comedy&p=2&l=6",
			"/api/v1/podcasts?title=Trevor&page=1",
		},
	}

	return c.JSON(http.StatusOK, response)
}
