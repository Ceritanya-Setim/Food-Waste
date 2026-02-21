package models

import "time"

type PaymentMethod string

const (
	MethodGopay        PaymentMethod = "gopay"
	MethodDana         PaymentMethod = "dana"
	MethodBankTransfer PaymentMethod = "bank_transfer"
)

type PaymentStatus string

const (
	StatusPending PaymentStatus = "pending"
	StatusSuccess PaymentStatus = "status"
	StatusFailed  PaymentStatus = "failed"
)

type Payments struct {
	BaseModel
	OrderID              string        `gorm:"type:uuid; not null"`
	Order                Order         `gorm:"foregnKey:OrderID;references:ID"`
	PaymentMethod        PaymentMethod `gorm:"type:varchar(50);not null"`
	PaymentStatus        PaymentStatus `gorm:"type:varchar(50);not null"`
	TransactionReference string        `gorm:"type:varchar(255);not null"`
	PaidAt               time.Time     `gorm:"default:null"`
}
