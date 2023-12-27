package models

type DivAdvHeader struct {
	Templates DivTemplates `json:"templates,omitempty"`
	Card      DivCard      `json:"card,omitempty"`
}

type TextBlock struct {
	FontSize                int             `json:"font_size"`
	TextAlignmentHorizontal string          `json:"text_alignment_horizontal"`
	TextAlignmentVertical   string          `json:"text_alignment_vertical"`
	Paddings                DivPaddings     `json:"paddings"`
	Width                   DivWidth        `json:"width"`
	Height                  DivHeight       `json:"height"`
	Background              []DivBackground `json:"background"`
	Border                  DivBorder       `json:"border"`
}

type DivWidth struct {
	Type string `json:"type"`
}

type DivHeight struct {
	Type string `json:"type"`
}

type DivPaddings struct {
	Top    int `json:"top,omitempty"`
	Bottom int `json:"bottom,omitempty"`
	Left   int `json:"left,omitempty"`
	Right  int `json:"right,omitempty"`
}

type DivBackground struct {
	Type  string `json:"type"`
	Color string `json:"color,omitempty"`
}

type DivBorder struct {
	CornerRadius int `json:"corner_radius"`
}

type DivTemplates struct {
	// Text_block TextBlock `json:"text_block,omitempty"`
	Title DivTitle `json:"title,omitempty"`
}

type DivCard struct {
	LogId  string      `json:"log_id"`
	States []DivStates `json:"states,omitempty"`
}

type DivStates struct {
	StateId int `json:"state_id"`
	Div     Div `json:"div"`
}

type Div struct {
	Type        string `json:"type"`
	Orientation string `json:"orientation,omitempty"`
	// Margins     DivMargins          `json:"margins,omitempty"`
	Items []DivItemsContainer `json:"items,omitempty"`
}

type DivMargins struct {
	Top    int `json:"top,omitempty"`
	Bottom int `json:"bottom,omitempty"`
}

type DivItemsDiv struct {
	Type  string              `json:"type,omitempty"`
	Items []DivItemsContainer `json:"items,omitempty"`
}

type DivItemsContainer struct {
	Type        string           `json:"type,omitempty"`
	Id          string           `json:"id,omitempty"`
	ItemSpacing []DivItemSpacing `json:"item_spacing,omitempty"`
	Text        string           `json:"text,omitempty"`
}

type DivItemSpacing struct {
	Type  string          `json:"type"`
	Value int             `json:"value,omitempty"`
	Items []DivItemsPager `json:"items,omitempty"`
}

type DivItemsPager struct {
}

func ExampleDIV() *DivAdvHeader {

	return &DivAdvHeader{
		Templates: DivTemplates{
			Title: DivTitle{
				Type:        "text",
				FontSize:    20,
				Line_height: 24,
				Paddings: DivPaddings{
					Left:   24,
					Right:  24,
					Bottom: 16,
				},
			},
		},
		Card: DivCard{
			LogId:  "sample_card",
			States: []DivStates{NewDivState()},
		},
	}
}

func NewDivState() DivStates {
	return DivStates{
		StateId: 0,
		Div: Div{
			Type: "container",
			Items: []DivItemsContainer{
				DivItemsContainer{
					Type: "title",
					Text: "Hello From Back!!!",
				},
			},
		},
	}
}

type DivTitle struct {
	Type        string      `json:"type"`
	FontSize    int         `json:"font_size,omitempty"`
	Line_height int         `json:"line_height,omitempty"`
	Paddings    DivPaddings `json:"paddings,omitempty"`
}
