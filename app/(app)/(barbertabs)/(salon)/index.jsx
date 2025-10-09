import { useTheme } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../../components/ThemeTextPrimary'
import ThemeTextSecondary from '../../../../components/ThemeTextSecondary'
import { LocationIcon } from '../../../../constants/icons'

const index = () => {

  const { colors } = useTheme();

  return (
    <ThemeSafeAreaView
      edges={['top', 'left', 'right']}
    >
      <View style={{
        width: "100%",
        height: verticalScale(200),
        backgroundColor: "#efefef",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <ThemeTextPrimary style={{
          fontSize: scale(60),
          fontFamily: "AirbnbCereal_W_Bd"
        }}>Salon</ThemeTextPrimary>
      </View>

      <View style={{
        flex: 1,
        padding: scale(10)
      }}>
        <View style={{
          gap: verticalScale(5)
        }}>
          <ThemeTextPrimary style={{
            fontSize: scale(26),
            fontFamily: "AirbnbCereal_W_XBd"
          }}>The Beauty Lounge</ThemeTextPrimary>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(10)
          }}>
            <LocationIcon color="#14b8a6" size={scale(16)} />
            <ThemeTextSecondary>Birmingham, UK</ThemeTextSecondary>
          </View>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >

        </View>
      </View>
    </ThemeSafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})