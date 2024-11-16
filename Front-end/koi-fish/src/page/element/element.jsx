import Navbar from "../../components/navbar/Navbar";


const ElementPage = () => {
  return (
    <div >
        <Navbar />
        <div className="flex flex-col items-center justify-start">
            <div className="text-2xl font-bold mb-6 text-center mt-10">
        Your element is Fire    
      </div>
 <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {/* Image box */}
        <div className="flex items-center justify-center bg-white shadow-lg border rounded-lg p-4">
          <span className="text-lg font-semibold">Image of Fire</span>
        </div>

        {/* Information box */}
        <div className="flex items-center justify-center bg-white shadow-lg border rounded-lg p-4">
          <span className="text-lg font-semibold">
            Fire is a dynamic and energetic element. It represents passion,
            strength, and transformation. 🔥
          </span>
        </div>
      </div>
        </div>
    </div>
  );
};

export default ElementPage;