// THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// 
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
// DO NOT USE IT IN PRODUCTION.
export var DateIntervalType;
(function (DateIntervalType) {
    DateIntervalType["None"] = "";
    DateIntervalType["Day"] = "day";
    DateIntervalType["Week"] = "week";
    DateIntervalType["Month"] = "month";
    DateIntervalType["Year"] = "year";
})(DateIntervalType || (DateIntervalType = {}));
export var DateTimeGranularityType;
(function (DateTimeGranularityType) {
    DateTimeGranularityType["Day"] = "day";
    DateTimeGranularityType["Month"] = "month";
    DateTimeGranularityType["Year"] = "year";
})(DateTimeGranularityType || (DateTimeGranularityType = {}));
export var AggregateFunctionType;
(function (AggregateFunctionType) {
    AggregateFunctionType["Average"] = "avg";
    AggregateFunctionType["Count"] = "count";
    AggregateFunctionType["Max"] = "max";
    AggregateFunctionType["Min"] = "min";
    AggregateFunctionType["Sum"] = "sum";
})(AggregateFunctionType || (AggregateFunctionType = {}));
export var OutputType;
(function (OutputType) {
    OutputType["Dataframe"] = "dataframe";
    OutputType["Array"] = "array";
    OutputType["Html"] = "html";
})(OutputType || (OutputType = {}));
