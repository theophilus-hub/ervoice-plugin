export const THEME_COLORS = [
    { name: "Ocean Blue", value: "#0EA5E9" },
    { name: "Royal Purple", value: "#8B5CF6" },
    { name: "Deep Purple", value: "#231971" },
    { name: "Professional Gray", value: "#403E43" },
    { name: "red", value: "#ED2726" },
    { name: "Orange", value: "#FD7318" },
    { name: "green", value: "#26D549" },
  ] ;
  
  export const generateInvoiceNumber = () => {
    return `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };