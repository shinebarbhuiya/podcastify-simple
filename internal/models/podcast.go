package models

type Podcast struct {
	ID              string        `json:"id"`
	Title           string        `json:"title"`
	Images          PodcastImages `json:"images"`
	IsExclusive     bool          `json:"isExclusive"`
	Publisher       string        `json:"publisherName"`
	PublisherID     string        `json:"publisherId"`
	MediaType       string        `json:"mediaType"`
	Description     string        `json:"description"`
	CategoryID      string        `json:"categoryId"`
	CategoryName    string        `json:"categoryName"`
	HasFreeEpisodes bool          `json:"hasFreeEpisodes"`
	PlaySequence    string        `json:"playSequence"`
}

type PodcastImages struct {
	Default   string `json:"default"`
	Featured  string `json:"featured"`
	Thumbnail string `json:"thumbnail"`
	Wide      string `json:"wide"`
}

type PodcastsResponse struct {
	Podcasts []Podcast `json:"podcasts"`
	Total    int       `json:"total"`
	Page     int       `json:"page"`
	Limit    int       `json:"limit"`
}

type SearchParams struct {
	Search       string
	Title        string
	CategoryName string
	Page         int
	Limit        int
}
