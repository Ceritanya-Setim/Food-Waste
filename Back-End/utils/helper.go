package utils

import "time"

func parseTime(value string) time.Time {

	t, err := time.Parse(time.RFC3339, value)

	if err != nil {
		return time.Time{}
	}

	return t
}
