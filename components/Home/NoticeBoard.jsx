import React, { useRef, useState, useEffect } from "react";
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

const { width } = Dimensions.get("window");

const banners = [
  { type: "text", content: "📢 Midterm exams start from Oct 21" },
  { type: "text", content: "📢 Midterm exams start from Oct 21" },
  { type: "text", content: "💼 Placement prep starts Oct 15 – Check mail" },
  { type: "text", content: "💼 Placement prep starts Oct 15 – Check mail" },
];

export default function NoticeBoard() {
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % banners.length;
      scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderBanner = (item, i) => (
    <View key={i} style={styles.banner}>
      {item.type === "text" ? (
        <View style={styles.textCard}>
          <Text style={styles.text}>{item.content}</Text>
        </View>
      ) : (
        <Image
          source={{ uri: item.content }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {banners.map((item, i) => renderBanner(item, i))}
      </ScrollView>
      <View style={styles.dots}>
        {banners.map((_, i) => (
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
