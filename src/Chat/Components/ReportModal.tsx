import React from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../../Common/Components/Button/CommonButton";
import CustomText from "../../Common/Components/Text/CustomText";
import CommonStyles from "../../Common/style/CommonStyles";
import SpaceStyles from "../../Common/style/SpaceStyles";
import TextStyles from "../../Common/style/TextStyles";

type props = {
    openReportModal: boolean;
    setOpenReportModal: Function;
    onPressReport: () => void;
    onPressDelete:()=>void;
    showDeleteButton:boolean;
};

const ReportModal = ({ openReportModal, setOpenReportModal, onPressReport, showDeleteButton , onPressDelete }: props) => {

    return (
        <Modal
            isVisible={openReportModal}
            animationIn={'slideInUp'}
            animationOut='slideOutDown'
            onBackButtonPress={() => setOpenReportModal(false)}
            onBackdropPress={() => setOpenReportModal(false)}
        >
            <View style={CommonStyles.reportModalView}>
                {showDeleteButton &&  <><TouchableOpacity
                    onPress={onPressDelete}
                >
                    <CustomText
                        text={`Delete Match`}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.alignSelf]}
                        numberOfLines={undefined}
                    />
                </TouchableOpacity>
                <View style={[CommonStyles.lineView, SpaceStyles.vertical2]} />
                </>}
                <TouchableOpacity
                    onPress={onPressReport}
                >
                    <CustomText
                        text={`Report`}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.alignSelf]}
                        numberOfLines={undefined}
                    />
                </TouchableOpacity>
                <View style={[CommonStyles.lineView, SpaceStyles.vertical2]} />
                <TouchableOpacity
                    onPress={() => setOpenReportModal(false)}
                >
                    <CustomText
                        text={`Cancel`}
                        style={[TextStyles.regular14DarkBlue, SpaceStyles.alignSelf]}
                        numberOfLines={undefined}
                    />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ReportModal;