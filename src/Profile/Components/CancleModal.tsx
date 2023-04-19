import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import CommonButton from "../../Common/Components/Button/CommonButton";
import CustomText from "../../Common/Components/Text/CustomText";
import CommonStyles from "../../Common/style/CommonStyles";
import SpaceStyles from "../../Common/style/SpaceStyles";
import TextStyles from "../../Common/style/TextStyles";

type props = {
    openFilterModal: boolean;
    setOpenFilterModal: Function;
};

const CancleModal = ({ openFilterModal, setOpenFilterModal }: props) => {

    return (
        <Modal
            isVisible={openFilterModal}
            animationIn={'slideInUp'}
            animationOut='slideOutDown'
            onBackButtonPress={() => setOpenFilterModal(false)}
            onBackdropPress={() => setOpenFilterModal(false)}
        >
            <View style={CommonStyles.cancelModalView}>
                <CustomText
                    text={`Cancel the upgrade`}
                    style={[TextStyles.regularDongle48DarkBlue, SpaceStyles.alignSelf]}
                    numberOfLines={undefined}
                />
                <CustomText
                    text={`Are you sure you want to cancel the upgrade? Upon expiration of the upgrade period, the upgrade will not automatically renew.`}
                    style={[TextStyles.regular14DarkBlue, SpaceStyles.top1, SpaceStyles.alignSelf, SpaceStyles.spaceHorizontal]}
                    numberOfLines={undefined}
                />

                <CommonButton
                    containerStyle={SpaceStyles.top3}
                    title={'Cancel the upgrade'}
                    onPress={() => setOpenFilterModal(false)}
                    whiteButton={false}
                />
                <View style={SpaceStyles.top2}>
                    <CommonButton
                        containerStyle={undefined}
                        title={'Keep upgrading'}
                        onPress={() => setOpenFilterModal(false)}
                        whiteButton={true}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default CancleModal;