import { useTranslation } from 'react-i18next'
import SimpleModal from '../components/Common/SimpleModal'
import { View, Text, Button } from 'react-native'

interface SettingsModalProps {
	isUserModalVisible: boolean
	onRequestClose: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({
	isUserModalVisible,
	onRequestClose,
}) => {
	const { t } = useTranslation()
	return (
		<SimpleModal
			isModalVisible={isUserModalVisible}
			onRequestClose={onRequestClose}
			showCloseButton={true}
		>
			<View
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 35, marginBottom: 30 }}>
					{t('settings.title')}
				</Text>
				<Text style={{ fontSize: 20, marginBottom: 25 }}>
					{t('settings.account_info')}
				</Text>
				<View style={{ width: 250, marginBottom: 25 }}>
					<View style={{ marginBottom: 10 }}>
						<Button title={t('settings.log_in')} />
					</View>
					<View style={{ marginBottom: 10 }}>
						<Button title={t('settings.create_account')} />
					</View>
					<View style={{ marginBottom: 10 }}>
						<Button title={t('settings.privacy_settings')} />
					</View>
				</View>
				<Text style={{ fontSize: 20, marginBottom: 25 }}>
					{t('settings.app_info')}
				</Text>
				<View style={{ width: 250 }}>
					<View style={{ marginBottom: 10 }}>
						<Button title={t('settings.contact_us')} />
					</View>
				</View>
			</View>
		</SimpleModal>
	)
}

export default SettingsModal
