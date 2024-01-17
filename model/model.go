// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse and unparse this JSON data, add this code to your project and do:
//
//    captureRecord, err := UnmarshalCaptureRecord(bytes)
//    bytes, err = captureRecord.Marshal()

package model

import "encoding/json"

func UnmarshalCaptureRecord(data []byte) (CaptureRecord, error) {
	var r CaptureRecord
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *CaptureRecord) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type CaptureRecord struct {
	AddrName         string     `json:"addr_name"`
	AddrNo           string     `json:"addr_no"`
	CapTime          string     `json:"cap_time"`
	CloseupPic       CloseupPic `json:"closeup_pic"`
	CloseupPicFlag   bool       `json:"closeup_pic_flag"`
	Cmd              string     `json:"cmd"`
	DeviceNo         string     `json:"device_no"`
	DeviceSn         string     `json:"device_sn"`
	IsRealtime       int64      `json:"is_realtime"`
	Match            Match      `json:"match"`
	MatchFailedReson int64      `json:"match_failed_reson"`
	MatchResult      int64      `json:"match_result"`
	OverallPicFlag   bool       `json:"overall_pic_flag"`
	Person           Person     `json:"person"`
	SequenceNo       int64      `json:"sequence_no"`
	Version          string     `json:"version"`
	VideoFlag        bool       `json:"video_flag"`
}

type CloseupPic struct {
	Data       string `json:"data"`
	FaceHeight int64  `json:"face_height"`
	FaceWidth  int64  `json:"face_width"`
	FaceX      int64  `json:"face_x"`
	FaceY      int64  `json:"face_y"`
	Format     string `json:"format"`
}

type Match struct {
	CustomerText string   `json:"customer_text"`
	Format       string   `json:"format"`
	Image        string   `json:"image"`
	IsEncryption bool     `json:"is_encryption"`
	MatchType    []string `json:"match_type"`
	Origin       string   `json:"origin"`
	PersonAttr   string   `json:"person_attr"`
	PersonID     string   `json:"person_id"`
	PersonName   string   `json:"person_name"`
	PersonRole   int64    `json:"person_role"`
	WgCardID     int64    `json:"wg_card_id"`
}

type Person struct {
	Age         int64   `json:"age"`
	FaceQuality int64   `json:"face_quality"`
	HasMask     bool    `json:"has_mask"`
	Hat         string  `json:"hat"`
	RotateAngle int64   `json:"rotate_angle"`
	Sex         string  `json:"sex"`
	Temperatur  float64 `json:"temperatur"`
	TurnAngle   int64   `json:"turn_angle"`
	WgCardID    int64   `json:"wg_card_id"`
}
