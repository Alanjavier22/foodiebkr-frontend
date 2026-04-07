import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Seccion from "./components/Seccion";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Clientes");

  const handleSelect = (selectedKey) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveTab(selectedKey);
  };

  return (
    <div className="min-h-[85vh] bg-[#f9fbfc] pt-5 pb-20 relative overflow-hidden">
      {/* Abstract Background for Premium Feel */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/40 to-pink-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60 translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* Glassmorphism Sidebar Navigation */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full xl:w-2/12 xl:sticky xl:top-24 max-h-min"
            >
              <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-100/50 rounded-full blur-xl"></div>
                
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight uppercase relative z-10 border-b border-gray-100 pb-4">
                   Métricas
                </h3>
                
                <Nav className="flex-col gap-3 relative z-10 w-full" variant="pills" activeKey={activeTab}>
                  {["Clientes", "Cotizaciones", "Ventas"].map((text, idx) => {
                    const isActive = activeTab === text;
                    return (
                      <Nav.Item key={idx} className="w-full">
                        <Nav.Link
                          eventKey={text}
                          className={`w-full flex items-center px-5 py-3.5 rounded-full font-bold tracking-wider text-sm transition-all duration-300 ${
                            isActive 
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 translate-x-1" 
                              : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-800 hover:translate-x-1"
                          }`}
                        >
                          {text}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="w-full xl:w-10/12">
               <Tab.Content>
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTab}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                   >
                     <Tab.Pane eventKey={activeTab}>
                       <Seccion _seccion={activeTab} />
                     </Tab.Pane>
                   </motion.div>
                 </AnimatePresence>
               </Tab.Content>
            </div>

          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default Dashboard;
