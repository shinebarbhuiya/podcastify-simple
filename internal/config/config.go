package config

import (
	"os"
	"strconv"
)

type Config struct {
	ServerPort        string
	PodcastServiceURL string
	RateLimit         int
	RateWindow        int
	Timeout           int
}

func Load() *Config {
	rateLimit, _ := strconv.Atoi(getEnv("RATE_LIMIT", "100")) // 100 requests in 1 minute
	window, _ := strconv.Atoi(getEnv("RATE_WINDOW", "1"))     // 1 minute
	timeout, _ := strconv.Atoi(getEnv("TIMEOUT", "5"))

	return &Config{
		ServerPort:        getEnv("SERVER_PORT", "8080"),
		PodcastServiceURL: getEnv("PODCAST_SERVICE_URL", "https://601f1754b5a0e9001706a292.mockapi.io"),
		RateLimit:         rateLimit,
		RateWindow:        window,
		Timeout:           timeout,
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
