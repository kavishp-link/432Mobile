import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderProfile } from '../../../component/customComponent/HeaderProfile';
import { icon } from '../../../assets/images/Image';
import Container from '../../../component/customComponent/Container';
import { TopBar } from '../../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../assets/types/Types';
import { PoppinsFonts } from '../../../assets/fonts';
import { Colors } from '../../../assets/colors/Colors';
import { graphMockData } from '../../../component/helper/Helper';
import { LineChart, PieChart } from 'react-native-chart-kit';

export const WorkspaceGraph = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [data, setData] = useState<any>(graphMockData);

  return (
    <Container>
      <TopBar
        midText={'Frequency Bazaar'}
        onLeftPress={() => navigation.goBack()}
        isBackButton={true}
      />

      <View style={{ marginVertical: 20 }}>
        <HeaderProfile avatar={icon.userAvatar} />
      </View>
      <Text style={styles.sectionTitle} numberOfLines={2}>
        Frequency Bazaar
      </Text>

      <View style={styles.divider} />
      <ScrollView style={{ alignSelf: 'center', marginHorizontal: 10 }}>
        <Text style={[styles.subHeader, { fontSize: 16 }]} numberOfLines={1}>
          Portfolio Performance
        </Text>

        <LineChart
          data={{
            labels: data.performance.map((item: any) => item.day.toString()),
            datasets: [
              { data: data.performance.map((item: any) => item.value) },
            ],
          }}
          width={screenWidth - 30}
          height={200}
          chartConfig={lineChartConfig}
          bezier
          style={styles.chartStyle}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <View style={[styles.flexBox, {}]}>
            <Text
              style={[styles.subHeader, { fontSize: 16, maxWidth: 100 }]}
              numberOfLines={2}
            >
              Royalty{'\n'}Insights
            </Text>
            <Ionicons
              name='arrow-up'
              size={20}
              color={'#4ADC67'}
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.royaltyText}>+{data.royaltyGrowth}%</Text>
          </View>
          <View style={styles.separator} />
          <View style={[styles.flexBox, {}]}>
            <Text
              style={[
                styles.subHeader,
                { fontSize: 16, marginHorizontal: 10, textAlign: 'left' },
              ]}
              numberOfLines={2}
            >
              Marketing {'\n'}PieChart
            </Text>
          </View>
        </View>
        <View style={styles.rowBetween}>
          <View style={[styles.audienceCard, { maxWidth: screenWidth * 0.35 }]}>
            <Text style={styles.subHeader} numberOfLines={2}>
              Audience Demographic
            </Text>
            <Image source={icon.audienceLogo} style={styles.audienceIcon} />
          </View>

          <View style={{ maxWidth: screenWidth * 0.6, alignItems: 'center' }}>
            <PieChart
              data={graphMockData.funnelData}
              width={screenWidth * 0.75}
              height={screenWidth * 0.37}
              chartConfig={{
                backgroundColor: '#121212',
                backgroundGradientFrom: '#1E1E1E',
                backgroundGradientTo: '#1E1E1E',
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={(screenWidth * 0.01 - 15).toFixed(2)}
              center={[screenWidth * 0.085, screenHeight * 0.01]}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pricing Recommendations</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const lineChartConfig = {
  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: 'cyan',
  },
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: PoppinsFonts.SemiBold,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: 10,
  },
  subHeader: {
    color: 'white',
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
  },
  rowBetween: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  audienceCard: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  audienceIcon: {
    width: 57,
    height: 57,
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: PoppinsFonts.Medium,
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  separator: {
    width: 1,
    backgroundColor: Colors.borderColor,
    minHeight: 50,
  },
  royaltyText: {
    color: '#4ADC67',
    fontFamily: PoppinsFonts.SemiBold,
    fontSize: 22,
    marginLeft: 5,
  },
});
