// To parse this data:
//
//   import { Convert, CaptureRecord } from "./file";
//
//   const captureRecord = Convert.toCaptureRecord(json);

export interface CaptureRecord {
    addr_name:          string;
    addr_no:            string;
    cap_time:           string;
    closeup_pic:        CloseupPic;
    closeup_pic_flag:   boolean;
    cmd:                string;
    device_no:          string;
    device_sn:          string;
    is_realtime:        number;
    match:              Match;
    match_failed_reson: number;
    match_result:       number;
    overall_pic_flag:   boolean;
    person:             Person;
    sequence_no:        number;
    version:            string;
    video_flag:         boolean;
}

export interface CloseupPic {
    data:        string;
    face_height: number;
    face_width:  number;
    face_x:      number;
    face_y:      number;
    format:      string;
}

export interface Match {
    customer_text: string;
    format:        string;
    image:         string;
    is_encryption: boolean;
    match_type:    string[];
    origin:        string;
    person_attr:   string;
    person_id:     string;
    person_name:   string;
    person_role:   number;
    wg_card_id:    number;
}

export interface Person {
    age:          number;
    face_quality: number;
    has_mask:     boolean;
    hat:          string;
    rotate_angle: number;
    sex:          string;
    temperatur:   number;
    turn_angle:   number;
    wg_card_id:   number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCaptureRecord(json: string): CaptureRecord {
        return JSON.parse(json);
    }

    public static captureRecordToJson(value: CaptureRecord): string {
        return JSON.stringify(value);
    }
}
