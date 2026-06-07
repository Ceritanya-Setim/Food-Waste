package utils

import (
	"errors"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

func SaveImage(
	file *multipart.FileHeader,
	location string,
) (
	string,
	error,
) {

	if file == nil {
		return "", nil
	}

	if file.Size >
		5*1024*1024 {

		return "",
			errors.New(
				"max image size is 5MB",
			)
	}

	ext := strings.ToLower(
		filepath.Ext(
			file.Filename,
		),
	)

	switch ext {

	case ".jpg",
		".jpeg",
		".png",
		".webp":

	default:

		return "",
			errors.New(
				"invalid image format",
			)
	}

	filename :=
		uuid.NewString() +
			ext

	dst :=
		"storage/" + location + "/" +
			filename

	src, err := file.Open()

	if err != nil {
		return "", err
	}

	defer src.Close()

	out, err := os.Create(dst)

	if err != nil {
		return "", err
	}

	defer out.Close()

	_, err = io.Copy(
		out,
		src,
	)

	if err != nil {
		return "", err
	}

	return "/storage/" + location + "/" +
			filename,
		nil
}
