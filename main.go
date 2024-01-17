package main

import (
	"embed"
	"fmt"
	"io"
	"log"
	"main/model"
	"net/http"
	"os"
	_ "strings"

	"github.com/labstack/echo"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

type FileLoader struct {
    http.Handler
}

func NewFileLoader() *FileLoader {
    return &FileLoader{}
}

func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	log.Printf("%s, %s", req.URL.Path, req.Method)
	if req.URL.Path == "/upload/record" {
		if req.Method == "POST" {
			bytes, _ := io.ReadAll(req.Body)
			cr, _ := model.UnmarshalCaptureRecord(bytes)
			json, _ := cr.Marshal()
			log.Println(string(json))
			res.WriteHeader(http.StatusOK)
			res.Write([]byte(fmt.Sprint("well done")))
		}
	} else {
		var err error
		fullPath := "C:\\FaceRASystemTool" + req.URL.Path
		println("Requesting file:", fullPath)
		fileData, err := os.ReadFile(fullPath)
		if err != nil {
			res.WriteHeader(http.StatusBadRequest)
			res.Write([]byte(fmt.Sprintf("Could not load file %s", fullPath)))
		}
		//res.Header().Add("content-type", "image/jpg")
		res.Write(fileData)
	}
    
}

func main() {
	app := NewApp()
	go echoServer(app)

	// Create an instance of the app structure

	// Create application with options
	err := wails.Run(&options.App{
		Title:             "wails-reset1",

		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
		AssetServer:       &assetserver.Options{
			Assets: assets,
			Handler: NewFileLoader(),
		},
		Menu:              nil,
		Logger:            nil,
		LogLevel:          logger.DEBUG,
		OnStartup:         app.startup,
		OnDomReady:        app.domReady,
		OnBeforeClose:     app.beforeClose,
		OnShutdown:        app.shutdown,
		WindowStartState:  options.Normal,
		Bind: []interface{}{
			app,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
			// DisableFramelessWindowDecorations: false,
			WebviewUserDataPath: "",
			ZoomFactor: 1.0,
		},
		// Mac platform specific options
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: true,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			Appearance:           mac.NSAppearanceNameDarkAqua,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "wails-reset1",
				Message: "",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}

	
}

func echoServer(a *App) {
	e := echo.New()
	e.POST("/upload/record", func(c echo.Context) error {
		var r model.CaptureRecord
		c.Bind(&r)
		//bytes,_ := r.Marshal()
		//data := string(bytes)
		runtime.EventsEmit(a.ctx, "capture-record", r)
		return c.JSON(http.StatusOK, map[string]string{"msg": "well done"})
	})
	port := 8080
	log.Fatal(e.Start(fmt.Sprintf(":%d", port)))
}

func use(interface{}) {

}
