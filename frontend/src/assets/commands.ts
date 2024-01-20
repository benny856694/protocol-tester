const commands: {[index: string]: {[index: string]:object}} = {
    "人员管理": {
        "upload person": {
                "cmd": "upload person",
                "id": "0001",
                "name": "XiaoMing",
                "role": 1,
                "kind": 2
        },
    },
    "设备控制": {
        "gpio control": {
            "cmd": "gpio control",
            "port": 1,
            "ctrl_type": "on",
            "ctrl_mode": "force",
            "person_id": "0001"
        },
    },
}


export default commands

