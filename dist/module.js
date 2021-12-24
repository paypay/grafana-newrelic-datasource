define(["lodash","app/plugins/sdk"],(function(t,e){return function(t){var e={};function n(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(s,o,function(e){return t[e]}.bind(null,o));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=2)}([function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";n.r(e);var s=n(0);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var u=function(){function t(t){var e=this;this.output={columns:[],rows:[],type:"table"};try{t.forEach((function(t){var n=t.result;if(n&&n.data&&n.data.metadata){var o=n.data;if(o.timeSeries||o.current&&o.current.timeSeries){if(console.log("Received results in timeseries format"),o.timeSeries)e.handleTimeseriesResult(o.metadata,o.timeSeries,"",0);else if(o.current&&e.handleTimeseriesResult(o.metadata,o.current.timeSeries,"",0),o.previous){var u=o.metadata.rawCompareWith||"Previous";e.handleTimeseriesResult(o.metadata,o.previous.timeSeries,u,o.metadata.compareWith||0)}}else if(o.facets&&o.facets[0]&&o.facets[0].timeSeries){console.log("Received results in table with timeseries format"),e.output.columns&&e.output.rows&&(e.output=[]);var r=o.metadata;Object(s.each)(o.facets,(function(t,n){0===r.contents.timeSeries.contents.length?e.handleSingleColumnFacetResults(r,t,n):e.handleMultiColumnFacetResults(r,t,n)}))}else o.facets?e.handleTableResults(t):o.results?o.metadata.contents&&o.metadata.contents[0]?"funnel"===o.metadata.contents[0].function?e.handleFunnelTypeResults(o):"events"===o.metadata.contents[0].function?e.handleEventsTypeResults(o):"uniques"===o.metadata.contents[0].function?e.handleUniquesTypeResults(o):o.metadata.contents.length>0?e.handleMultiStatWithoutHistory(o):console.log("Result type not handled"):e.handleResultsTypeResults(o):o.current&&o.previous?e.handleSingleStateWithHistory(o):console.log("This format of result is not handled yet")}}))}catch(t){console.log("Error while parsing the results",t)}}return t.prototype.pushTimeSeriesResult=function(t,e){this.output.columns&&this.output.rows&&(this.output=[]);var n={target:t,datapoints:e};this.output.push(n)},t.prototype.handlePercentageResults=function(t,e,n,s){console.log("percentage results");var o=(t.function||"")+" ("+t.of.function+" of "+t.filter+")",u=e.map((function(t){return[t.results[s].result,1e3*t.beginTimeSeconds+n]}));this.pushTimeSeriesResult(o,u)},t.prototype.handlePercentileResults=function(t,e,n,s){var o=this;console.log("percentile results"),t.thresholds.forEach((function(u){var r=(t.attribute||"")+" ("+u+" %)",i=e.map((function(t){return[t.results[s].percentiles[u.toString()],1e3*t.beginTimeSeconds+n]}));o.pushTimeSeriesResult(r,i)}))},t.prototype.handleHistogramResults=function(t,e,n){var o=this;console.log("Received Timeseries histogram"),Object(s.each)(t[0].results[0].histogram,(function(s,u){var r=u.toString(),i=t.map((function(t){return[t.results[n].histogram[u.toString()],1e3*t.beginTimeSeconds+e]}));o.pushTimeSeriesResult(r,i)}))},t.prototype.handleStepResults=function(t,e,n,s){var o=this;console.log("Step results"),t.steps.forEach((function(t,u){var r=t,i=e.map((function(t){return[t.results[s].steps[u],1e3*t.beginTimeSeconds+n]}));o.pushTimeSeriesResult(r,i)}))},t.prototype.handleSingleColumnFacetResults=function(t,e,n){var s=t.contents.timeSeries.contents[0].contents.function||"count";s="uniquecount"===s?"uniqueCount":s;var o=e.name||n,u=e.timeSeries.map((function(t){return[t.results[0][s],1e3*t.beginTimeSeconds]}));this.pushTimeSeriesResult(o,u)},t.prototype.handleMultiColumnFacetResults=function(t,e,n){var o=this;Object(s.each)(t.contents.timeSeries.contents,(function(t,s){var u=function(t){var e="";return e="binop"===(e="uniquecount"===(e=t.simple?t.function:t.contents.contents?t.contents.contents.function:t.contents.function)?"uniqueCount":e)?"result":e}(t);"rate"===u&&(u="result");var r=(e.name||n)+" "+(t.alias||u),i=e.timeSeries.map((function(t){return[t.results[s][u],1e3*t.beginTimeSeconds]}));o.pushTimeSeriesResult(r,i)}))},t.prototype.handleRegularTimeseriesResutls=function(t,e,n,s,o){console.log("Regular Timeseries");var u=((t.alias||(t.contents?t.contents.alias||t.contents.function:t.function))+(o?" ( "+o.toLowerCase()+" )":"")).trim(),r=t.contents?t.contents.contents?t.contents.contents.function:t.contents.function:t.alias||t.function;r="uniquecount"===r?"uniqueCount":r;var i=u,c=e.map((function(t){return[t.results[s][r]||t.results[s].result,1e3*t.beginTimeSeconds+n]}));this.pushTimeSeriesResult(i,c)},t.prototype.handleTimeseriesResult=function(t,e,n,s){var o=this,u=t.timeSeries||t.contents.timeSeries;try{u.contents.forEach((function(t,u){t&&"percentage"===t.function&&t.simple?o.handlePercentageResults(t,e,s,u):t&&"percentile"===t.function?o.handlePercentileResults(t,e,s,u):t&&"histogram"===t.function?o.handleHistogramResults(e,s,u):t.steps?o.handleStepResults(t,e,s,u):o.handleRegularTimeseriesResutls(t,e,s,u,n)}))}catch(t){console.log("Error while parsing timeseries results")}},t.prototype.handleFunnelTypeResults=function(t){var e=this;console.log("funnel Type"),this.output.columns.push({text:t.metadata.contents[0].attribute,type:"string"},{text:"value",type:o(t.results[0].steps[0])}),Object(s.each)(t.metadata.contents[0].steps,(function(n,s){e.output.rows.push([n,t.results[0].steps[s]])}))},t.prototype.handleEventsTypeResults=function(t){console.log("events Type"),this.output={columns:[],rows:[],type:"table"};var e=[],n=[],u=new Set;Object(s.each)(t.results[0].events,(function(t){Object(s.each)(t,(function(t,e){u.has(e)||"timestamp"!==e||(u.add(e),n.push({text:"Time",type:o(new Date(0))}))})),Object(s.each)(t,(function(t,e){u.has(e)||(u.add(e),n.push({text:e,type:"appId"===e?"string":o(t)}))}))})),Object(s.each)(t.results[0].events,(function(t){var s=[];n.forEach((function(e){"Time"===e.text?s.push(new Date(t.timestamp)):s.push(t[e.text])})),e.push(s)})),this.output.columns=n,this.output.rows=e},t.prototype.handleResultsTypeResults=function(t){var e=this;console.log("Results Type"),this.output={columns:[],rows:[],type:"table"},Object(s.each)(t.metadata.contents,(function(n){e.output.columns=[],n.columns?Object(s.each)(n.columns,(function(n){e.output.columns.push({text:n,type:o(t.results[0].events[0][n])})})):n.constant&&e.output.columns.push({text:n.alias||"constant"})})),Object(s.each)(t.results[0].events,(function(n){var o=[];Object(s.each)(t.metadata.contents[0].columns,(function(t){o.push(n[t])})),e.output.rows.push(o)}))},t.prototype.handleUniquesTypeResults=function(t){var e=this;console.log("Uniques Type"),this.output={columns:[],rows:[],type:"table"},Object(s.each)(t.metadata.contents,(function(t){e.output.columns=[],e.output.columns.push({text:t.attribute,type:"string"})})),Object(s.each)(t.results[0].members,(function(t){var n=[];n.push(t),e.output.rows.push(n)}))},t.prototype.handleSingleStateWithHistory=function(t){var e=this;console.log("Single stat with history"),this.output={columns:[],rows:[],type:"table"},this.output.columns.push({text:"stat",type:"string"}),Object(s.each)(t.metadata.contents.contents,(function(t){e.output.columns.push({type:"string",text:t.function})})),Object(s.each)(t.current.results,(function(n){var o=[];o.push("Current"),Object(s.each)(t.metadata.contents.contents,(function(t){o.push(n[t.function])})),e.output.rows.push(o)})),Object(s.each)(t.previous.results,(function(n){var o=[];o.push(t.metadata.rawCompareWith||"Previous"),Object(s.each)(t.metadata.contents.contents,(function(t){o.push(n[t.function])})),e.output.rows.push(o)}))},t.prototype.handleMultiStatWithoutHistory=function(t){var e=this;console.log("Multiple stats without history"),this.output={columns:[],rows:[],type:"table"},this.output.columns.push({text:"stat",type:"string"}),this.output.columns.push({text:"value",type:"number"}),Object(s.each)(t.metadata.contents,(function(n,s){var o=[];o.push(n.alias||n.contents.alias);var u="count";u="uniquecount"===(u=n.contents?n.contents.contents?n.contents.contents.function:n.contents.function:n.function||"count")?"uniqueCount":u,o.push(t.results[s][u]),e.output.rows.push(o)}))},t.prototype.handleTableResults=function(t){var e=this;console.log("Received results in table format");var n=[],u=t.result.data.facets,r=t.result.data.metadata,i=r.facet;Object(s.each)(u,(function(t){var e={};e[i]=t.name,Object(s.each)(r.contents.contents,(function(n,s){var o=n.simple?n.function:n.contents.contents?n.contents.contents.function:n.contents.function;o="uniquecount"===o?"uniqueCount":o,e[n.alias||n.function]=t.results[s][o]})),n.push(e)})),0===this.output.columns.length&&(r.facet?(Object(s.each)(n[0],(function(t,n){n===r.facet&&e.output.columns.push({text:n,type:o(t)})})),Object(s.each)(n[0],(function(t,n){n!==r.facet&&e.output.columns.push({text:n,type:o(t)})}))):Object(s.each)(n[0],(function(t,n){e.output.columns.push({text:n,type:o(t)})}))),Object(s.each)(n,(function(t){if(r.facet){var n=[];Object(s.each)(t,(function(t,e){e===r.facet&&n.push(t)})),Object(s.each)(t,(function(t,e){e!==r.facet&&n.push(t)})),e.output.rows.push(n)}else{var o=[];Object(s.each)(t,(function(t,e){o.push(t)})),e.output.rows.push(o)}}))},t.prototype.getResultsAsVariablesList=function(){var t=[];return Object(s.each)(this.output.rows,(function(e){Object(s.each)(e,(function(e){t.push({text:e,value:e})}))})),t},t}(),r=function(){function t(t,e,n,s){this.instanceSettings=t,this.backendSrv=e,this.templateSrv=n,this.$q=s,this.url=this.instanceSettings.url+"/insights",this.insightsAccountID=this.instanceSettings.jsonData.insightsAccountID}return t.$inject=["instanceSettings","backendSrv","templateSrv","$q"],t.prototype.doInsightsRequest=function(t,e){var n=this;void 0===e&&(e=1);var s=Object.keys(t).filter((function(t){return["nrql"].indexOf(t)>-1})).map((function(e){return e+"="+encodeURI(t[e])})).join("&");return this.backendSrv.datasourceRequest({method:"GET",url:this.url+"/"+this.insightsAccountID+"/query?"+s}).catch((function(s){if(e>0)return n.doInsightsRequest(t,e-1);throw s}))},t.prototype.doQueries=function(t){var e=this;return t.map((function(t){return e.doInsightsRequest(t).then((function(e){return{result:e,query:t}})).catch((function(e){throw{error:e,query:t}}))}))},t.prototype.query=function(t){var e=this,n=t.targets.filter((function(t){return!0!==t.hide&&t.insights&&t.insights.nrql})).map((function(n){var s=n.insights,o=" SINCE "+t.range.from+" UNTIL "+t.range.to+" ";return s.nrql.toLowerCase().includes(" since ")||s.nrql.toLowerCase().includes(" until ")||(s.nrql+=" "+o),"table"!==s.resultFormat&&(s.nrql.toLowerCase().endsWith("timeseries")||s.nrql.toLowerCase().includes(" timeseries ")||(s.nrql+=" timeseries auto ")),s.nrql=e.templateSrv.replace(s.nrql,t.scopedVars),s}));if(n&&0!==n.length){var s=this.doQueries(n);return this.$q.all(s).then((function(t){return new u(t).output}))}},t.prototype.metricFindQuery=function(t){if(t.startsWith("Insights(")&&t.endsWith(")")){var e=t.replace("Insights(","").slice(0,-1),n={nrql:this.templateSrv.replace(e),format:"table"},s=this.doQueries([n]);return this.$q.all(s).then((function(t){return new u(t).getResultsAsVariablesList()}))}},t}(),i=function(){function t(t,e,n,s){this.instanceSettings=t,this.backendSrv=e,this.templateSrv=n,this.$q=s,this.insightsDataSource=new r(this.instanceSettings,this.backendSrv,this.templateSrv,this.$q)}return t.$inject=["instanceSettings","backendSrv","templateSrv","$q"],t.prototype.query=function(t){var e=[],n=Object(s.cloneDeep)(t);if(n.targets=Object(s.filter)(n.targets,["queryType","insights"]),n.targets.length>0){var o=this.insightsDataSource.query(n);o&&e.push(o)}return Promise.all(e).then((function(t){return{data:Object(s.flatten)(t)}}))},t.prototype.testDatasource=function(){var t=this;return new Promise((function(e,n){try{t.insightsDataSource.query({range:{from:"",to:""},targets:[{insights:{nrql:"SELECT 1 FROM Mobile SINCE TODAY",resultFormat:"table"}}]}).then((function(t){t?e({message:"Successfully Queried from Newrelic",status:"success"}):n({message:"Failed to Connect",status:"error"})})).catch((function(t){console.log(t),n({message:"Failed to Connect",status:"error"})}))}catch(t){console.log(t),n({message:"Failed to Connect",status:"error"})}}))},t.prototype.metricFindQuery=function(t){if(!t)return Promise.resolve([]);var e=this.insightsDataSource.metricFindQuery(t);return e||Promise.resolve([])},t}(),c=function(t,e){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};var a=function(t){function e(e,n){var o=t.call(this,e,n)||this;return o.supportedServices=[{text:"Insights API",value:"insights"}],o.supportedFormats={insights:[{text:"Time Series",value:"timeseries"},{text:"Table",value:"table"}]},o.defaults={queryType:"insights",insights:{nrql:"",resultFormat:"timeseries"}},Object(s.defaultsDeep)(o.target,o.defaults),o}return e.$inject=["$scope","$injector"],function(t,e){function n(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.templateUrl="partials/query.editor.html",e}(n(1).QueryCtrl),l=function(){function t(){this.current.id&&(this.current.url="/api/datasources/proxy/"+this.current.id)}return t.templateUrl="partials/config.html",t}();n.d(e,"Datasource",(function(){return i})),n.d(e,"QueryCtrl",(function(){return a})),n.d(e,"ConfigCtrl",(function(){return l}))}])}));