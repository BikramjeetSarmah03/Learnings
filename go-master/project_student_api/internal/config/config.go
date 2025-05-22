package config

import (
	"flag"
	"log"
	"os"

	"github.com/ilyakaznacheev/cleanenv"
)

// capital letter struct are public

// we will serialize using go-clean-env
// serializing using backticks and options from go-clean-env

type HTTPServer struct {
	Address string `yaml:"address" env-required:"true"`
}

// env-default:"production"

type Config struct {
	Env         string `yaml:"env" env:"ENV" env-required:"true"`
	StoragePath string `yaml:"storage_path" env-required:"true"`
	HTTPServer  `yaml:"http_server"`
}

// return type is pointer of config
func MustLoad() *Config {
	var configPath string

	configPath = os.Getenv("CONFIG_PATH")

	if configPath == "" {
		flags := flag.String("config", "", "path to the configuration file")
		flag.Parse()

		// dereferencing flags
		configPath = *flags

		if configPath == "" {
			log.Fatal("Config Path is not set")
		}
	}

	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		log.Fatalf("Config file doesn't exist: %s", configPath)
	}

	var cfg Config

	// path and pointer
	err := cleanenv.ReadConfig(configPath, &cfg)

	if err != nil {
		log.Fatalf("Cannot read config file: %s", err.Error())
	}

	return &cfg

}
