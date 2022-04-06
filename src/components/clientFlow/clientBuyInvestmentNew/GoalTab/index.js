import React, { useEffect, useState } from "react";
import "./style.scss";
import GoalTab from "./GoalTab";
import RecommendTab from "./RecommendTab";
import ProductCategoryTab from "./ProductCategoryTab";
const InvestmentGoalTab = ({ userOptions = [], commonGoal = [] }) => {
  let [activeTab, setActiveTab] = useState("Investment");

  useEffect(() => {
    if (commonGoal?.length === 0) {
      let schemeObj = userOptions.find(
        (x) => x.Label === "Recommended Schemes"
      );
      if (schemeObj) {
        setActiveTab("Schemes");
      } else {
        let categoryObj = userOptions.find(
          (x) => x.Label === "Product Categories"
        );
        if (categoryObj) {
          setActiveTab("Categories");
        } else {
          setActiveTab(null);
        }
      }
    }
  }, [userOptions, commonGoal]);

  //handle Tabs
  const handleTabs = () => {
    switch (activeTab) {
      case "Investment":
        return <GoalTab commonGoal={commonGoal} />;
      case "Schemes":
        return <RecommendTab userOptions={userOptions} />;
      case "Categories":
        return <ProductCategoryTab userOptions={userOptions} />;
      default:
        return null;
    }
  };
  return (
    <div className="tab-section">
      <div className="tabbar">
        {commonGoal?.length !== 0 && (
          <div
            onClick={() => setActiveTab("Investment")}
            className={"tab " + (activeTab === "Investment" ? "active" : "")}
          >
            Common goals
          </div>
        )}
        {userOptions.find((x) => x.Label === "Recommended Schemes") && (
          <div
            onClick={() => setActiveTab("Schemes")}
            className={
              "border-right tab " + (activeTab === "Schemes" ? "active" : "")
            }
          >
            Recommended Schemes
          </div>
        )}
        {userOptions.find((x) => x.Label === "Product Categories") && (
          <div
            onClick={() => setActiveTab("Categories")}
            className={"tab " + (activeTab === "Categories" ? "active" : "")}
          >
            Product Categories
          </div>
        )}
      </div>
      <div className="tab-content">{handleTabs()}</div>
    </div>
  );
};
export default InvestmentGoalTab;
