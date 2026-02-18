import { useState, useRef } from 'react';
import { X, CheckCircle2, FileUp, Database, Download } from 'lucide-react'; // Added Download icon
import StrategicHeader from './components/StrategicHeader';
import KPIStatsCard from './components/KPIStatsCard';
import RecoveryFocusChart from './components/RecoveryFocusChart';
import RecoveryTable from './components/RecoveryTable';
import OperationalGoalCard from './components/OperationalGoalCard';
import StepByStep from './components/StepByStep';
import StatusFeedback from './components/StatusFeedback'; 
import Footer from './components/Footer';
import { processSalesDataAnalysis } from './services/api_service';

/**
 * @name SalesRecoveryApp
 * @description Main orchestrator for the BI tool. 
 * Manages file uploads, data validation, and dashboard rendering.
 */
function App() {
  const [analysis_results, setAnalysisResults] = useState(null);
  const [is_loading_data, setIsLoadingData] = useState(false);
  const [has_started, setHasStarted] = useState(false);
  const [threshold, setThreshold] = useState(60);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // States for API feedback (Success and Errors)
  const [apiError, setApiError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  /**
   * Triggers a browser download for the sample CSV file.
   */
  const handleDownloadSampleFile = () => {
    const link = document.createElement('a');
    link.href = '/sales_recovery_sample.csv';
    link.download = 'sales_recovery_sample.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Loads the internal fictitious data to simulate a real upload.
   */
  const handleUseSampleFile = async () => {
    try {
      setApiError(null);
      setIsSuccess(false);
      
      // Fetching the file from the public directory
      const response = await fetch('/sales_recovery_sample.csv');
      
      if (!response.ok) throw new Error("Sample file not found in public folder.");
      
      const blob = await response.blob();
      const file = new File([blob], 'sales_recovery_sample.csv', { type: 'text/csv' });
      
      setSelectedFile(file);
    } catch (error) {
      console.error("Sample Load Error:", error);
      setApiError({ message: "Failed to load sample file. Check if the file is in the public folder." });
    }
  };

  /**
   * Cleans all analysis states and resets the HTML file input value.
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAnalysisResults(null);
    setHasStarted(false);
    setApiError(null);
    setIsSuccess(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Triggers backend processing after front-end pre-flight checks.
   */
  const handleSalesFileUpload = async () => {
    setApiError(null);
    setIsSuccess(false);

    // Front-end Validations
    if (!selectedFile) {
      setApiError({ message: "No file selected. Please upload a CSV dataset." });
      return;
    }

    if (!threshold || threshold === "") {
      setApiError({ message: "Inactivity threshold cannot be empty." });
      return;
    }

    if (parseInt(threshold) < 60) {
      setApiError({ message: "Minimum inactivity threshold is 60 days." });
      return;
    }

    setIsLoadingData(true);
    setHasStarted(true);
    
    try {
      const parsed_data = await processSalesDataAnalysis(selectedFile, threshold);
      setAnalysisResults(parsed_data);
      setIsSuccess(true);
    } catch (api_error) {
      console.error("Analysis Failed:", api_error);
      setHasStarted(false); 
      setApiError(api_error); // StatusFeedback component will interpret the raw error
    } finally {
      setIsLoadingData(false);
    }
  };

  /**
   * Updates state on file selection and clears previous messages.
   */
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setApiError(null);
    setIsSuccess(false);

    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setApiError({ message: "Invalid file format. Please select a .CSV file." });
        setSelectedFile(null);
        event.target.value = ""; 
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-light flex flex-col scroll-smooth">
      <StrategicHeader />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-[1200px]">
        
        {/* Visual feedback for API errors and successful operations */}
        <StatusFeedback 
          error={apiError} 
          success={isSuccess} 
          onClear={() => { setApiError(null); setIsSuccess(false); }} 
        />

        {/* Configuration and Upload Controls */}
        <section className="mb-10 p-6 md:p-8 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-center gap-6 transition-all duration-300">
          
          <div className="flex-1 w-full group relative">
            <input 
              type="file" 
              accept=".csv" 
              onChange={onFileChange} 
              className="hidden" 
              id="csv-input"
              ref={fileInputRef}
            />
            
            {selectedFile ? (
              /* State: File Selected */
              <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 border-2 border-primary bg-primary/5 rounded-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-2 rounded-lg">
                    <CheckCircle2 className="text-white" size={20} />
                  </div>
                  <div className="text-center md:text-left">
                    <span className="block text-sm md:text-base text-slate-900 font-black tracking-tight">{selectedFile.name}</span>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest italic">Dataset ready for BI processing</span>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveFile}
                  className="mt-4 md:mt-0 p-2 hover:bg-red-100 text-red-500 rounded-full transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer"
                >
                  <X size={16} /> Remove
                </button>
              </div>
            ) : (
              /* State: Empty / Idle */
              <div className="flex flex-col gap-4">
                <label 
                  htmlFor="csv-input" 
                  className="flex flex-col md:flex-row items-center justify-center p-6 md:p-8 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary hover:bg-slate-50/50 transition-all duration-300"
                >
                  <div className="bg-slate-50 p-3 rounded-full md:mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FileUp className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                  </div>
                  <div className="text-center md:text-left mt-4 md:mt-0">
                    <span className="block text-sm md:text-base text-slate-700 font-black group-hover:text-primary">Click to select sales dataset</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">CSV format required (Semicolon separated)</span>
                  </div>
                </label>
                
                {/* Sample Actions Container */}
                <div className="flex items-center justify-center gap-6">
                  <button 
                    onClick={handleUseSampleFile}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors py-1 cursor-pointer"
                  >
                    <Database size={12} />
                    Use sample data
                  </button>
                  
                  <div className="w-px h-3 bg-slate-200" /> {/* Visual separator */}

                  <button 
                    onClick={handleDownloadSampleFile}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors py-1 cursor-pointer"
                  >
                    <Download size={12} />
                    Download sample CSV
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Threshold Input Field */}
            <div className="flex flex-col bg-slate-50 p-4 rounded-xl border border-slate-200 min-w-[160px] w-full sm:w-auto">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Inactivity Threshold</span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={threshold} 
                  onChange={(e) => setThreshold(e.target.value)} 
                  className={`bg-transparent text-2xl font-black w-16 outline-none transition-colors ${parseInt(threshold) < 60 ? 'text-red-500' : 'text-slate-900 focus:text-primary'}`}
                  min="60" 
                />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Days</span>
              </div>
            </div>
            
            {/* Primary Action Button */}
            <button 
              onClick={handleSalesFileUpload} 
              disabled={!selectedFile || is_loading_data} 
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3 shadow-lg shadow-primary/25"
            >
              {is_loading_data ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Analyze</span>
              )}
            </button>
          </div>
        </section>

        {/* Step-by-Step guide (Visible only when idle) */}
        {!selectedFile && <StepByStep />}

        {/* BI Dashboard (Visible during loading and after data arrives) */}
        {(has_started || analysis_results) && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Top KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <KPIStatsCard 
                label="Recovery Potential" 
                value={analysis_results?.summary?.recovery_potential_value} 
                isCurrency 
                loading={is_loading_data} 
                type="potential" 
                trend="+12% estimated"
              />
              <KPIStatsCard 
                label="Clients in Churn" 
                value={analysis_results?.summary?.churned_clients_total} 
                loading={is_loading_data} 
                type="churn" 
                trend="Action required"
              />
              <KPIStatsCard 
                label="Global Ticket Average" 
                value={analysis_results?.summary?.global_average_ticket} 
                isCurrency 
                loading={is_loading_data} 
                type="avg" 
                trend="Standard base"
              />
            </div>

            {/* Operational Metrics */}
            <OperationalGoalCard 
              callsPerDay={analysis_results?.summary?.suggested_daily_calls || 0} 
              totalClients={analysis_results?.summary?.churned_clients_total || 0} 
              loading={is_loading_data} 
            />
            
            {/* Strategic Visualization */}
            <RecoveryFocusChart 
              recovery_data_list={analysis_results?.recovery_focus_list || []} 
            />
            
            {/* Detailed Data View */}
            <RecoveryTable 
              clients={analysis_results?.recovery_focus_list || []} 
              loading={is_loading_data} 
            />
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export default App;