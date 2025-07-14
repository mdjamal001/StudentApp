import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../Theme";
import { supabase } from "../../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../utils/AuthContext";

const { width } = Dimensions.get("window");

export default function NoticeBoard() {
  const { user } = useContext(AuthContext);

  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notices, setNotices] = useState([]);

  const currentIndexRef = useRef(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const sem = await AsyncStorage.getItem("semester");
        const branch = await AsyncStorage.getItem("branch");
        const { data: notification_ids, error } = await supabase
          .from("NoticeBoard")
          .select("notification_id")
          .eq("branch", branch)
          .eq("semester", sem);

        if (!error) {
          const notificationIds = notification_ids.map(
            (n) => n.notification_id
          );
          const { data: notifications, error: notificationError } =
            await supabase
              .from("notifications")
              .select("info")
              .in("id", notificationIds);

          if (!notificationError && notifications.length > 0) {
            setNotices(notifications);
          }
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || notices.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % notices.length;
      if (scrollRef.current?.scrollTo) {
        scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
      }

      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [notices]);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderBanner = (item, i) => (
    <View key={i} style={styles.banner}>
      <View style={styles.textCard}>
        <Text style={styles.text}>{item.info}</Text>
      </View>
    </View>
  );

  if (!user) {
    return (
      <View style={styles.container} className="justify-center items-center ">
        <View
          className="flex-1 justify-center items-center rounded-lg"
          style={{
            width: width - 40,
            backgroundColor: theme.secondaryColor(0.1),
          }}
        >
          <Text className="text-lg text-gray-600">
            Log In to view Notice Board
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {notices.map((item, i) => renderBanner(item, i))}
      </ScrollView>
      <View style={styles.dots}>
        {notices.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, currentIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginVertical: 16,
  },
  banner: {
    width: width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textCard: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.secondaryColor(0.1),
    padding: 20,
    borderRadius: 10,
    width: width - 40,
  },
  text: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
  },
  image: {
    width: width - 40,
    height: 120,
    borderRadius: 10,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#ccc",
  },
  activeDot: {
    backgroundColor: theme.primaryColor(1),
  },
});
