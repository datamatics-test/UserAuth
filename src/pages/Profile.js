import React, { Component } from "react";
import CategoryWithGradient from "../component/CategoryWithGradient";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { logoutUser } from "../action/auth.actions";
import filterCategory from "./filterCategory";
import CategoryList from "./CategoryList";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import categoryList from "../assets/categoryList.json";

const { width: WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#31C5C3",
    alignItems: "center",
    marginTop: 7
  },
  categoryContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F2F2F2",
    borderBottomWidth: 1
  },
  catSelectionContainer: {
    height: 40,
    width: 330,
    backgroundColor: "#F2F2F2",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  catText: {
    color: "#3AD1BF",
    fontSize: 12,
    textAlign: "center",
    margin: 12
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 45,
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderColor: "#F2F2F2"
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "all",
      filteredCategory: filterCategory("all", ""),
      sum: this.findCatSum("all")
    };
    //console.log("###############################");
    //console.log(this.state.filteredCategory);
  }

  findCatSum(cat) {
    let sum = 0;
    Object.keys(categoryList)
      .filter(key => {
        if (key === cat) {
          return true;
        }
        if (cat == "all") {
          return true;
        }
      })
      .filter(o => {
        categoryList[o].map(ob => {
          sum = sum + ob.balance;
          //  console.log(sum);
        });
      });

    return sum.toFixed(2);
  }

  handleCategoryChange(category) {
    this.setState({
      filteredCategory: filterCategory(category, ""),
      selectedCategory: category,
      sum: this.findCatSum(category)
    });
  }

  logoutUser = () => {
    this.props.dispatch(logoutUser());
  };

  handleSearchChange = event => {
    this.setState({
      filteredCategory: filterCategory(this.state.selectedCategory, event)
    });
  };
  render() {
    const {
      getUser: { userDetails }
    } = this.props;

    return (
      <View style={styles.viewContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#F2F2F2",
            borderBottomWidth: 1
          }}
        >
          <Image
            style={{ marginLeft: 19 }}
            source={require("../assets/Ellipse.png")}
          />
          <Image
            style={{ marginLeft: 107 }}
            source={require("../assets/Logo.png")}
          />
          <Image
            style={{ marginLeft: 114, marginRight: 25 }}
            source={require("../assets/bell.png")}
          />
        </View>
        <View style={styles.categoryContainer}>
          <View style={{ flexDirection: "row", textAlign: "center" }}>
            <View style={styles.circle}></View>
            <Text> Your Portfolio</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <CategoryWithGradient
              categoryValue={
                this.state.selectedCategory == "all"
                  ? "category A"
                  : this.state.selectedCategory
              }
            />
            <Text> {this.state.sum}</Text>
          </View>

          <TouchableWithoutFeedback style={styles.catSelectionContainer}>
            <TouchableOpacity
              onPress={() => this.handleCategoryChange("category A")}
            >
              <Text style={styles.catText}>CATEGORY A </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleCategoryChange("category B")}
            >
              <Text style={styles.catText}>CATEGORY B </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleCategoryChange("category C")}
            >
              <Text style={styles.catText}>CATEGORY C </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleCategoryChange("all")}>
              <Text style={styles.catText}>ALL </Text>
            </TouchableOpacity>
          </TouchableWithoutFeedback>
          <View>
            <TextInput
              placeholder="Search"
              style={styles.input}
              onChangeText={this.handleSearchChange}
            />
          </View>
        </View>
        <View
          style={{
            flex: 3,
            borderColor: "#F2F2F2",
            borderBottomWidth: 1,
            marginLeft: 35,
            marginRight: 40
          }}
        >
          <ScrollView>
            <CategoryList categoryList={this.state.filteredCategory} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => ({
  getUser: state.userReducer.getUser
});

mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
