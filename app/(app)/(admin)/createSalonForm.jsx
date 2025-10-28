// import PhoneInput from '@linhnguyen96114/react-native-phone-input'
// import { useTheme } from '@react-navigation/native'
// import { useRouter } from 'expo-router'
// import { useState } from 'react'
// import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
// import { scale, verticalScale } from 'react-native-size-matters'
// import ThemeSafeAreaView from '../../../components/ThemeSafeAreaView'
// import ThemeTextPrimary from '../../../components/ThemeTextPrimary'
// import ThemeTextSecondary from '../../../components/ThemeTextSecondary'
// import { LeftIcon } from '../../../constants/icons'

// const CreateSalonForm = () => {

//   const router = useRouter()
//   const { colors } = useTheme()
//   const colorScheme = useColorScheme();

//   const stepper = [
//     { id: 1, title: 'Account' },
//     { id: 2, title: 'Business' },
//     { id: 3, title: 'Services' },
//     { id: 4, title: 'Gallery' },
//     { id: 5, title: 'Social' },
//   ]

//   const [selectedStep, setSelectedStep] = useState(1)

//   const [salonName, setSalonName] = useState("")
//   const [salonDescription, setSalonDescription] = useState("")
//   const [salonEmail, setSalonEmail] = useState("")
//   const [salonMobileNumber, setSalonMobileNumber] = useState('');

//   return (
//     <ThemeSafeAreaView
//       edges={['top']}
//     >
//       {/* Header */}
//       <View style={[styles.header, { borderBottomColor: colors.borderColor1 }]}>
//         <LeftIcon size={scale(16)} />
//         <ThemeTextPrimary style={styles.headerTitle}>
//           Create Your Salon
//         </ThemeTextPrimary>
//       </View>

//       {/* Stepper */}
//       <View style={styles.stepperContainer}>
//         {stepper.map((item) => (
//           <View key={item.id} style={styles.stepItem}>
//             <TouchableOpacity
//               onPress={() => setSelectedStep(item.id)}
//               style={[
//                 styles.stepCircle,
//                 { backgroundColor: selectedStep === item.id ? "#14b8a6" : colors.progressBgColor },
//               ]}
//             >
//               <ThemeTextPrimary
//                 style={{
//                   color: selectedStep === item.id ? "#ffffff" : colors.textColor1
//                 }}
//               >{item.id}</ThemeTextPrimary>
//             </TouchableOpacity>
//             <ThemeTextSecondary style={[
//               styles.stepLabel,
//               {
//                 color: selectedStep === item.id ? "#14b8a6" : colors.textColor2,
//                 fontFamily: selectedStep === item.id ? 'AirbnbCereal_W_Bd' : 'AirbnbCereal_W_Md'
//               }
//             ]}>
//               {item.title}
//             </ThemeTextSecondary>
//           </View>
//         ))}
//       </View>

//       {/* Content */}
//       <ScrollView
//         style={[
//           styles.scrollView,
//           {
//             backgroundColor: colors.background2,
//             borderColor: colors.borderColor1,
//           },
//         ]}
//       >
//         {
//           selectedStep === 1 && (
//             <>
//               <View>
//                 <ThemeTextPrimary style={{
//                   fontSize: scale(18),
//                   fontFamily: 'AirbnbCereal_W_Bd',
//                 }}>Account Information</ThemeTextPrimary>
//                 <ThemeTextSecondary style={{
//                   marginTop: verticalScale(5),
//                 }}>Please enter your account details.</ThemeTextSecondary>
//               </View>

//               <View
//                 style={{
//                   marginVertical: verticalScale(15),
//                   flexDirection: "column",
//                   gap: verticalScale(15)
//                 }}
//               >

//                 <View style={{ gap: verticalScale(10) }}>
//                   <ThemeTextPrimary>Salon Name</ThemeTextPrimary>
//                   <TextInput
//                     editable
//                     placeholder="Enter your salon name"
//                     value={salonName}
//                     onChangeText={setSalonName}
//                     placeholderTextColor={colors.textColor2}
//                     style={[styles.inputField, {
//                       backgroundColor: colors.background,
//                       borderColor: colors.borderColor1,
//                       color: colors.textColor1
//                     }]}
//                   />
//                 </View>

//                 <View style={{ gap: verticalScale(10) }}>
//                   <ThemeTextPrimary>Salon Description</ThemeTextPrimary>
//                   <TextInput
//                     editable
//                     multiline
//                     numberOfLines={5}
//                     textAlignVertical="top"
//                     placeholder="Enter your salon description"
//                     value={salonDescription}
//                     onChangeText={setSalonDescription}
//                     placeholderTextColor={colors.textColor2}
//                     style={[styles.inputField, {
//                       backgroundColor: colors.background,
//                       borderColor: colors.borderColor1,
//                       color: colors.textColor1,
//                       height: verticalScale(80),
//                     }]}
//                   />
//                 </View>

//                 <View style={{ gap: verticalScale(10) }}>
//                   <ThemeTextPrimary>Salon Email</ThemeTextPrimary>
//                   <TextInput
//                     editable
//                     placeholder="Enter your salon email"
//                     value={salonEmail}
//                     onChangeText={setSalonEmail}
//                     placeholderTextColor={colors.textColor2}
//                     style={[styles.inputField, {
//                       backgroundColor: colors.background,
//                       borderColor: colors.borderColor1,
//                       color: colors.textColor1
//                     }]}
//                   />
//                 </View>

//                 <View style={{ gap: verticalScale(10) }}>
//                   <ThemeTextPrimary>Mobile Number</ThemeTextPrimary>
//                   <PhoneInput
//                     defaultValue={salonMobileNumber}
//                     defaultCode="GB"
//                     onChangeText={setSalonMobileNumber}
//                     disableArrowIcon
//                     withDarkTheme={colorScheme === 'dark' ? true : false}
//                     containerStyle={{
//                       width: '100%',
//                       borderRadius: scale(8),
//                       backgroundColor: colors.background,
//                       borderColor: colors.borderColor1,
//                       borderWidth: scale(1),
//                       height: verticalScale(40),
//                       color: colors.textColor1,
//                     }}
//                     textContainerStyle={{
//                       borderRadius: scale(8),
//                       backgroundColor: colors.background,
//                       color: colors.textColor1,

//                     }}
//                     flagButtonStyle={{
//                       width: scale(50),
//                       height: verticalScale(38),
//                     }}
//                     textInputStyle={{
//                       fontFamily: 'AirbnbCereal_W_Md',
//                       color: colors.textColor1,
//                     }}
//                     // Add this prop to style the dial code (+44)
//                     codeTextStyle={{
//                       fontFamily: 'AirbnbCereal_W_Md',
//                       color: colors.textColor1,

//                     }}
//                   />

//                 </View>

//               </View>

//             </>
//           )
//         }
//       </ScrollView>

//       <TouchableOpacity
//         // onPress={createSalonHandler}
//         style={styles.nextButton}
//       >
//         <ThemeTextPrimary style={{ color: "white", textAlign: "center" }}>
//           Continue
//         </ThemeTextPrimary>
//       </TouchableOpacity>
//     </ThemeSafeAreaView >
//   )
// }

// export default CreateSalonForm

// const styles = StyleSheet.create({
//   header: {
//     borderBottomWidth: scale(1),
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(10),
//     paddingBottom: verticalScale(10),
//     paddingHorizontal: scale(10),
//   },
//   headerTitle: {
//     fontSize: scale(18),
//     fontFamily: 'AirbnbCereal_W_Bd',
//   },
//   stepperContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: verticalScale(12)
//   },
//   stepItem: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: verticalScale(5),
//     width: "20%"
//   },
//   stepCircle: {
//     width: scale(35),
//     height: scale(35),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: scale(20),
//   },
//   stepLabel: {
//     fontSize: scale(12),
//   },
//   scrollView: {
//     flex: 1,
//     width: '95%',
//     alignSelf: 'center',
//     // marginBottom: verticalScale(10),
//     borderWidth: scale(1),
//     padding: scale(18),
//     borderRadius: scale(10),
//   },

//   inputField: {
//     borderWidth: scale(1),
//     borderRadius: scale(8),
//     paddingVertical: verticalScale(10),
//     paddingHorizontal: scale(12),
//     fontSize: scale(14),
//     fontFamily: 'AirbnbCereal_W_Md',
//   },

//   nextButton: {
//     backgroundColor: "#14b8a6",
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: scale(20),
//     borderRadius: scale(8),
//     marginTop: verticalScale(15),
//     marginBottom: verticalScale(20),
//     width: "95%",
//     marginHorizontal: "auto"
//   },
// })


import PhoneInput from '@linhnguyen96114/react-native-phone-input'
import { useTheme } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import ThemeSafeAreaView from '../../../components/ThemeSafeAreaView'
import ThemeTextPrimary from '../../../components/ThemeTextPrimary'
import ThemeTextSecondary from '../../../components/ThemeTextSecondary'
import { LeftIcon } from '../../../constants/icons'

const CreateSalonForm = () => {
  const router = useRouter()
  const { colors } = useTheme()
  const colorScheme = useColorScheme()

  const stepper = [
    { id: 1, title: 'Account' },
    { id: 2, title: 'Business' },
    { id: 3, title: 'Services' },
    { id: 4, title: 'Gallery' },
    { id: 5, title: 'Social' },
  ]

  const [selectedStep, setSelectedStep] = useState(1)
  const [salonName, setSalonName] = useState('')
  const [salonDescription, setSalonDescription] = useState('')
  const [salonEmail, setSalonEmail] = useState('')
  const [salonMobileNumber, setSalonMobileNumber] = useState('')

  return (
    <ThemeSafeAreaView edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.borderColor1 }]}>
        <LeftIcon size={scale(16)} />
        <ThemeTextPrimary style={styles.headerTitle}>Create Your Salon</ThemeTextPrimary>
      </View>

      {/* Stepper */}
      <View style={styles.stepperContainer}>
        {stepper.map((item) => (
          <View key={item.id} style={styles.stepItem}>
            <TouchableOpacity
              onPress={() => setSelectedStep(item.id)}
              style={[
                styles.stepCircle,
                { backgroundColor: selectedStep === item.id ? '#14b8a6' : colors.progressBgColor },
              ]}
            >
              <ThemeTextPrimary
                style={{
                  color: selectedStep === item.id ? '#ffffff' : colors.textColor1,
                }}
              >
                {item.id}
              </ThemeTextPrimary>
            </TouchableOpacity>
            <ThemeTextSecondary
              style={[
                styles.stepLabel,
                {
                  color: selectedStep === item.id ? '#14b8a6' : colors.textColor2,
                  fontFamily:
                    selectedStep === item.id ? 'AirbnbCereal_W_Bd' : 'AirbnbCereal_W_Md',
                },
              ]}
            >
              {item.title}
            </ThemeTextSecondary>
          </View>
        ))}
      </View>

      {/* Keyboard Avoiding Wrapper */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(20) : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          style={[
            styles.scrollView,
            {
              backgroundColor: colors.background2,
              borderColor: colors.borderColor1,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {selectedStep === 1 && (
            <>
              <View>
                <ThemeTextPrimary
                  style={{
                    fontSize: scale(18),
                    fontFamily: 'AirbnbCereal_W_Bd',
                  }}
                >
                  Account Information
                </ThemeTextPrimary>
                <ThemeTextSecondary style={{ marginTop: verticalScale(5) }}>
                  Please enter your account details.
                </ThemeTextSecondary>
              </View>

              <View
                style={{
                  marginVertical: verticalScale(15),
                  flexDirection: 'column',
                  gap: verticalScale(15),
                }}
              >
                {/* Salon Name */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Name</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon name"
                    value={salonName}
                    onChangeText={setSalonName}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Description */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Description</ThemeTextPrimary>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                    placeholder="Enter your salon description"
                    value={salonDescription}
                    onChangeText={setSalonDescription}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                        height: verticalScale(80),
                      },
                    ]}
                  />
                </View>

                {/* Email */}
                <View style={{ gap: verticalScale(10) }}>
                  <ThemeTextPrimary>Salon Email</ThemeTextPrimary>
                  <TextInput
                    editable
                    placeholder="Enter your salon email"
                    value={salonEmail}
                    onChangeText={setSalonEmail}
                    placeholderTextColor={colors.textColor2}
                    style={[
                      styles.inputField,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderColor1,
                        color: colors.textColor1,
                      },
                    ]}
                  />
                </View>

                {/* Phone Number */}
                <View style={{ gap: verticalScale(10), marginBottom: verticalScale(40) }}>
                  <ThemeTextPrimary>Salon Phone Number</ThemeTextPrimary>
                  <PhoneInput
                    defaultValue={salonMobileNumber}
                    defaultCode="GB"
                    onChangeText={setSalonMobileNumber}
                    disableArrowIcon
                    withDarkTheme={colorScheme === 'dark'}
                    containerStyle={{
                      width: '100%',
                      borderRadius: scale(8),
                      backgroundColor: colors.background,
                      borderColor: colors.borderColor1,
                      borderWidth: scale(1),
                      height: verticalScale(45),
                    }}
                    textContainerStyle={{
                      borderRadius: scale(8),
                      backgroundColor: colors.background,
                    }}
                    flagButtonStyle={{
                      width: scale(50),
                      height: verticalScale(45),
                    }}
                    textInputStyle={{
                      fontFamily: 'AirbnbCereal_W_Md',
                      color: colors.textColor1,
                    }}
                    codeTextStyle={{
                      fontFamily: 'AirbnbCereal_W_Md',
                      color: colors.textColor1,
                    }}
                  />
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.nextButton}
        activeOpacity={0.8}
      >
        <ThemeTextPrimary style={{ color: 'white', textAlign: 'center' }}>Continue</ThemeTextPrimary>
      </TouchableOpacity>
    </ThemeSafeAreaView>
  )
}

export default CreateSalonForm

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: scale(1),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingBottom: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  headerTitle: {
    fontSize: scale(18),
    fontFamily: 'AirbnbCereal_W_Bd',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
  },
  stepItem: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(5),
    width: '20%',
  },
  stepCircle: {
    width: scale(35),
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
  stepLabel: {
    fontSize: scale(12),
  },
  scrollView: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    borderWidth: scale(1),
    padding: scale(18),
    borderRadius: scale(10),
  },
  scrollViewContent: {
    paddingBottom: verticalScale(80),
  },
  inputField: {
    borderWidth: scale(1),
    borderRadius: scale(8),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    fontSize: scale(14),
    fontFamily: 'AirbnbCereal_W_Md',
  },
  nextButton: {
    backgroundColor: '#14b8a6',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(20),
    width: '95%',
    alignSelf: 'center',
  },
})


