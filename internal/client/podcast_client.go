package client

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/shinebarbhuiya/simple-podcast/internal/models"
)

type PodcastClient struct {
	baseURL    string
	httpClient *http.Client
}

func NewPodcastClient(baseURL string, timeout int) *PodcastClient {
	return &PodcastClient{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: time.Duration(timeout) * time.Second,
		},
	}
}

func (c *PodcastClient) GetPodcasts(params models.SearchParams) ([]models.Podcast, error) {
	// Construct URL with query parameters
	u, err := url.Parse(fmt.Sprintf("%s/podcasts", c.baseURL))
	if err != nil {
		return nil, err
	}

	q := u.Query()
	if params.Search != "" {
		q.Set("search", params.Search)
	}
	if params.Title != "" {
		q.Set("title", params.Title)
	}
	if params.CategoryName != "" {
		q.Set("categoryName", params.CategoryName)
	}
	if params.Page > 0 {
		q.Set("page", strconv.Itoa(params.Page))
	}
	if params.Limit > 0 {
		q.Set("limit", strconv.Itoa(params.Limit))
	}
	u.RawQuery = q.Encode()

	// Make HTTP request
	resp, err := c.httpClient.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	// Decode response
	var podcasts []models.Podcast
	if err := json.NewDecoder(resp.Body).Decode(&podcasts); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return podcasts, nil
}
