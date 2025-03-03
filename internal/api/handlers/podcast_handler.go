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
