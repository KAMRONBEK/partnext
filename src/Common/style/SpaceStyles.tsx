import { StyleSheet } from "react-native";
import { BaseStyle } from "../constants/BaseStyle";

const HEIGHT = (BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (BaseStyle.DEVICE_WIDTH / 100)

const SpaceStyles = StyleSheet.create({
    alignSelf: {
        alignSelf: 'center'
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    rowJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alignSpaceBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center'
    },
    sortRoeWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center'
    },
    left5: {
        marginLeft: WIDTH * 5
    },
    left3: {
        marginLeft: WIDTH * 3
    },
    left2: {
        marginLeft: WIDTH * 2
    },
    left1: {
        marginLeft: WIDTH * 1
    },
    width70: {
        width: WIDTH * 70,
    },
    width80: {
        width: WIDTH * 80,
    },
    width40: {
        width: WIDTH * 40,
    },
    width35: {
        width: WIDTH * 35
    },
    spaceVertical: {
        marginVertical: HEIGHT * 2
    },
    vertical3: {
        marginVertical: HEIGHT * 3
    },
    top5: {
        marginTop: HEIGHT * 5
    },
    top8: {
        marginTop: HEIGHT * 8
    },
    top3: {
        marginTop: HEIGHT * 3
    },
    top2: {
        marginTop: HEIGHT * 2
    },
    top1: {
        marginTop: HEIGHT * 1
    },
    spaceHorizontal: {
        marginHorizontal: WIDTH * 5
    },
    horizontal10: {
        marginHorizontal: WIDTH * 10
    },
    vertical1: {
        marginVertical: HEIGHT * 1
    },
    vertical2: {
        marginVertical: HEIGHT * 2
    },
    paddingVertical2: {
        paddingVertical: HEIGHT * 2
    },
    paddingVertical1: {
        paddingVertical: HEIGHT * 1
    },
    width62: {
        width: WIDTH * 63
    },
    paddingTop2: {
        paddingTop: HEIGHT * 2
    },
    paddingBottom2: {
        paddingBottom: HEIGHT * 2
    },
    paddingBottom22: {
        paddingBottom: HEIGHT * 22
    },
    width15: {
        width: WIDTH * 15,
    },
    width20: {
        width: WIDTH * 20,
    },
    width45: {
        width: WIDTH * 45,
    },
    width43: {
        width: WIDTH * 43,
    },
    width55: {
        width: WIDTH * 55,
    },
    paddingLeft3: {
        paddingLeft: WIDTH * 3
    },
    bottom1: {
        marginBottom: HEIGHT * 1
    },
    bottom2: {
        marginBottom: HEIGHT * 2
    },
    bottom4: {
        marginBottom: HEIGHT * 4
    },
    horizontal3: {
        paddingHorizontal: WIDTH * 3
    },
    height28: {
        height: 28,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SpaceStyles;
