package dto

type SurplusFoodRequest struct {
	Keyword  string `form:"keyword"`
	Category string `form:"category"`
}
