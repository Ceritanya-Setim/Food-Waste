package utils

import "strings"

func TruncateWords(
	text string,
	limit int,
) string {

	words := strings.Fields(text)

	if len(words) <= limit {
		return text
	}

	return strings.Join(words[:limit], " ") + "..."
}
