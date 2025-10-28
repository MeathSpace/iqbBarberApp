import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { scale, verticalScale } from 'react-native-size-matters';
import ThemeSafeAreaView from '../../../../../components/ThemeSafeAreaView';
import ThemeTextPrimary from '../../../../../components/ThemeTextPrimary';
import ThemeTextSecondary from '../../../../../components/ThemeTextSecondary';

const index = () => {

  const { colors } = useTheme();

  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "Upcoming"
    },
    {
      id: 2,
      name: "History"
    },
  ])

  const [selectedTab, setSelectedTab] = useState("Upcoming")

  const handleServe = () => {
    console.log("Serve clicked for James Wilson");
  };

  const handleCancel = () => {
    console.log("Cancel clicked for James Wilson");
  };

  const handleNotify = () => {
    console.log("Notify clicked");
  };

  const handleMessage = () => {
    console.log("Message clicked");
  };

  const [expandedCardId, setExpandedCardId] = useState(null);

  const appointmentData = [
    {
      "id": 1,
      "name": "James Wilson",
      "service": "Short Haircut + Beard",
      "price": "$60.00",
      "duration": "45 min",
      "date": "Today",
      "time": "02:30 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 2,
      "name": "Michael Brown",
      "service": "Haircut + Shave",
      "price": "$55.00",
      "duration": "40 min",
      "date": "Today",
      "time": "03:15 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 3,
      "name": "David Smith",
      "service": "Classic Beard Trim",
      "price": "$30.00",
      "duration": "25 min",
      "date": "Today",
      "time": "04:00 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 4,
      "name": "Robert Johnson",
      "service": "Kids Haircut",
      "price": "$25.00",
      "duration": "20 min",
      "date": "Tomorrow",
      "time": "11:00 AM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 5,
      "name": "Daniel White",
      "service": "Fade Haircut",
      "price": "$50.00",
      "duration": "35 min",
      "date": "Tomorrow",
      "time": "12:30 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 6,
      "name": "Ethan Davis",
      "service": "Buzz Cut",
      "price": "$25.00",
      "duration": "20 min",
      "date": "Tomorrow",
      "time": "01:15 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 7,
      "name": "William Martinez",
      "service": "Hair Wash + Style",
      "price": "$40.00",
      "duration": "30 min",
      "date": "Tomorrow",
      "time": "02:00 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 8,
      "name": "Matthew Garcia",
      "service": "Long Hair Trim",
      "price": "$45.00",
      "duration": "40 min",
      "date": "Tomorrow",
      "time": "02:45 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 9,
      "name": "Christopher Lee",
      "service": "Haircut + Beard Lineup",
      "price": "$65.00",
      "duration": "50 min",
      "date": "Tomorrow",
      "time": "03:30 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 10,
      "name": "Anthony Clark",
      "service": "Razor Shave",
      "price": "$35.00",
      "duration": "30 min",
      "date": "Tomorrow",
      "time": "04:15 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 11,
      "name": "Joshua Lewis",
      "service": "Beard Styling",
      "price": "$28.00",
      "duration": "25 min",
      "date": "Tomorrow",
      "time": "05:00 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 12,
      "name": "Andrew Walker",
      "service": "Head Massage + Haircut",
      "price": "$70.00",
      "duration": "60 min",
      "date": "Tomorrow",
      "time": "05:45 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 13,
      "name": "Ryan Hall",
      "service": "Trim + Beard Cleanup",
      "price": "$35.00",
      "duration": "30 min",
      "date": "Tomorrow",
      "time": "06:30 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 14,
      "name": "Nathan Allen",
      "service": "Premium Haircut",
      "price": "$80.00",
      "duration": "70 min",
      "date": "Tomorrow",
      "time": "07:15 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    },
    {
      "id": 15,
      "name": "Samuel Young",
      "service": "Hair Wash + Trim",
      "price": "$45.00",
      "duration": "35 min",
      "date": "Tomorrow",
      "time": "08:00 PM",
      "image": "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop"
    }
  ]


  return (
    <ThemeSafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        padding: scale(15),
      }}
    >
      <View style={[styles.appointmentHeader, {
        backgroundColor: colors.progressBgColor
      }]}>
        {
          tabs.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(item.name)
                }}
                key={item.id}
                style={[styles.tabButton, {
                  backgroundColor:
                    selectedTab === item.name
                      ? colors.background2
                      : 'transparent'
                }]}><ThemeTextPrimary
                  style={{
                    color: selectedTab === item.name ? "#14b8a6" : colors.textColor1,
                    fontFamily: "AirbnbCereal_W_Bd"
                  }}
                >{item.name}</ThemeTextPrimary></TouchableOpacity>
            )
          })
        }
      </View>

      {
        selectedTab === "Upcoming" && (
          <View style={{
            marginTop: verticalScale(10),
            flex: 1
          }}>

            <FlatList
              data={appointmentData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AppointmentCard
                  item={item}
                  expandedCardId={expandedCardId}
                  setExpandedCardId={setExpandedCardId}
                  colors={colors}
                />
              )}
              contentContainerStyle={{ gap: verticalScale(10) }}
              showsVerticalScrollIndicator={false}
            />


          </View>
        )
      }

      {
        selectedTab === "History" && (
          <View style={{
            marginTop: verticalScale(10),
            flex: 1
          }}>
            <FlatList
              data={appointmentData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AppointmentHistoryCard
                  item={item}
                  colors={colors}
                />
              )}
              contentContainerStyle={{ gap: verticalScale(10) }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )
      }

    </ThemeSafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  appointmentHeader: {
    height: verticalScale(38),
    width: "100%",
    padding: scale(5),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    borderRadius: scale(8)
  },
  tabButton: {
    height: verticalScale(28),
    flex: 1,
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center"
  },


  card: {
    borderWidth: scale(1),
    borderRadius: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
    padding: scale(16)
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
  },
  name: {
    fontSize: scale(14),
    fontFamily: "AirbnbCereal_W_Bd"
  },
  service: {
    fontSize: scale(12),
  },
  price: {
    marginTop: verticalScale(4),
    fontSize: scale(14),
    color: "#14b8a6",
  },
  duration: {
    fontSize: scale(12),
  },
  date: {
    fontSize: scale(12),
  },
  time: {
    fontSize: scale(12),
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    overflow: "hidden",
  },
  actionBtn: {
    alignItems: "center",
  },
  actionText: {
    fontSize: scale(12),
    marginTop: verticalScale(4),
  },

})


const AppointmentCard = ({ item, expandedCardId, setExpandedCardId, colors }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(expandedCardId === item.id ? 70 : 0, { duration: 250 }),
    opacity: withTiming(expandedCardId === item.id ? 1 : 0, { duration: 200 }),
  }));

  return (
    <View style={[styles.card, { backgroundColor: colors.background2, borderColor: colors.borderColor1 }]}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        // onPress={() => setExpandedCardId(item.id)}
        onPress={() =>
          setExpandedCardId(prev => (prev === item.id ? null : item.id))
        }
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <ThemeTextPrimary style={styles.name}>{item.name}</ThemeTextPrimary>
          <ThemeTextSecondary style={styles.service}>{item.service}</ThemeTextSecondary>
          <ThemeTextPrimary style={styles.price}>
            {item.price} <ThemeTextSecondary style={styles.duration}>({item.duration})</ThemeTextSecondary>
          </ThemeTextPrimary>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <ThemeTextPrimary style={styles.date}>{item.date}</ThemeTextPrimary>
          <ThemeTextPrimary style={[styles.time, { color: colors.textColor2 }]}>{item.time}</ThemeTextPrimary>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.actions, animatedStyle, { borderColor: colors.borderColor1 }]}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => console.log("Notify")}>
          <Feather name="bell" size={scale(20)} color={"#eab308"} />
          <ThemeTextPrimary style={[styles.actionText, { color: "#eab308" }]}>Notify</ThemeTextPrimary>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => console.log("Msg")}>
          <Feather name="message-square" size={scale(20)} color={"#3b82f6"} />
          <ThemeTextPrimary style={[styles.actionText, { color: "#3b82f6" }]}>Msg</ThemeTextPrimary>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => console.log("Serve")}>
          <Feather name="check-circle" size={scale(20)} color={"#22c55e"} />
          <ThemeTextPrimary style={[styles.actionText, { color: "#22c55e" }]}>Serve</ThemeTextPrimary>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => console.log("Cancel")}>
          <Feather name="x-circle" size={scale(20)} color={"#ef4444"} />
          <ThemeTextPrimary style={[styles.actionText, { color: "#ef4444" }]}>Cancel</ThemeTextPrimary>
        </TouchableOpacity>
      </Animated.View>
    </View >
  );
};


const AppointmentHistoryCard = ({ item, colors }) => {

  return (
    <View style={[styles.card, { backgroundColor: colors.background2, borderColor: colors.borderColor1 }]}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <ThemeTextPrimary style={styles.name}>{item.name}</ThemeTextPrimary>
          <ThemeTextSecondary style={styles.service}>Long Hair</ThemeTextSecondary>
          <ThemeTextPrimary style={styles.price}>
            {item.price}
          </ThemeTextPrimary>
        </View>
        <TouchableOpacity activeOpacity={0.8}
          style={{
            alignItems: "flex-end",
            backgroundColor: "rgba(220, 38, 38, 0.2)",
            paddingHorizontal: scale(10),
            paddingVertical: verticalScale(3),
            borderRadius: scale(20)
          }}>
          <ThemeTextPrimary style={{ fontSize: scale(14), color: "#dc2626" }}>cancelled</ThemeTextPrimary>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};