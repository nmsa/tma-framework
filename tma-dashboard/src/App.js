import { Suspense, lazy } from 'react';
import NavBar from "./components/layout/NavBar";
import {Route, Routes} from 'react-router-dom';
import {Loader} from 'semantic-ui-react';

const ListMetricsPage = lazy(() => import('./pages/Metrics/ListMetricsPage'));
const ListQualityModelsPage = lazy(() => import('./pages/QualityModels/ListQualityModelsPage'));
const HomePage = lazy(() => import('./pages/HomePage'))
const ViewMetricPage = lazy(() => import("./pages/Metrics/ViewMetricPage"));
const CreateMetricPage = lazy(() => import("./pages/Metrics/CreateMetricPage"));
const ViewQualityModelPage = lazy(() => import("./pages/QualityModels/ViewQualityModelPage"));
const CreateConfigurationProfilePage = lazy(() => import( "./pages/ConfigurationProfiles/CreateConfigurationProfilePage"));
const CreateQualityModelPage = lazy(() => import("./pages/QualityModels/CreateQualityModelPage"));
const ViewConfigurationProfilePage = lazy(() => import("./pages/ConfigurationProfiles/ViewConfigurationProfilePage"));
const PlotResourceMetricsPage = lazy(() => import("./pages/Resources/PlotResourceMetricsPage"));
const SimulateResourceMetricsPage = lazy(() => import("./pages/Resources/SimulateResourceMetricsPage"));
const ListRulesPage = lazy(() => import("./pages/AdaptationRules/ListRulesPage"));
const CreateRulePage = lazy(() => import("./pages/AdaptationRules/CreateRulePage"));
const ViewRulePage = lazy(() => import("./pages/AdaptationRules/ViewRulePage"));

function App() {

  return (
    <div>
      <NavBar/>
      <Suspense fallback={<Loader active inline='centered'> Retrieving content </Loader>}>     
        <Routes>
          <Route path="/" exact element={<HomePage/>}></Route>


          
          <Route path="/createMetric" element={<CreateMetricPage/>}></Route>
          
          <Route path="/getMetrics/:id" element={<ViewMetricPage/>}></Route>

          <Route path="/getMetrics" element={<ListMetricsPage currpath="/getMetrics"/>}></Route>



          <Route path="/createQualityModel" element={<CreateQualityModelPage/>}></Route>
          
          <Route path="/getQualityModels/:id" element={<ViewQualityModelPage/>}></Route>
          
          <Route path="/getQualityModels" element={<ListQualityModelsPage currpath="/getQualityModels"/>}></Route>

          
          
          <Route path="/createConfigurationProfile" element={<CreateConfigurationProfilePage/>}></Route>
          
          <Route path="/getConfigurationProfile/:id" element={<ViewConfigurationProfilePage/>}></Route>


          <Route path="/getResources" element={<PlotResourceMetricsPage />}></Route>
          <Route path="/simulateMetrics" element={<SimulateResourceMetricsPage />}></Route>

          <Route path="/getAdaptationRules" element={<ListRulesPage currpath="/getAdaptationRules"/>}></Route>
          <Route path="/getAdaptationRules/:ruleName" element={<ViewRulePage/>}></Route>
          <Route path="/createAdaptationRule" element={<CreateRulePage/>}></Route>

        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
