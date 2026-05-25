package dto

type SurplusFoodRequest struct {
	Keyword  string  `form:"keyword"`
	Category string  `form:"category"`
	Price    int     `form:"price"`
	City     string  `form:"city"`
	Filter   string  `form:"filter"`
	Lat      float64 `form:"lat"`
	Lon      float64 `form:"lon"`
}
