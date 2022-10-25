
function TreeRenderFunctionsUtils() {

    function validChildMetrics(listOfChildMetrics){
        let metricIds = []
        for(let childMetric of listOfChildMetrics){ 
            if(validCompositionOfMetrics(childMetric,metricIds )=== false){
                return false
            }
        }
        return true
    }

    function validCompositionOfMetrics(currentMetric,metricIds){
        if(metricIds.includes(currentMetric["metricId"])){
            return false
        }
        else{
            metricIds.push(currentMetric["metricId"])
            for(let childMetric of currentMetric["childMetrics"]){
                if(validCompositionOfMetrics(childMetric,metricIds) === false){
                    return false
                }
            }
        }
        return true
    }

    return {
        validChildMetrics,
    };
}
      
export default TreeRenderFunctionsUtils
