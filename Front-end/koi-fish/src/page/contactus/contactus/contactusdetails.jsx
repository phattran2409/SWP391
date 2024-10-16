import React from "react";

const ContactUsDetails = () => {
  const offices = [
    {
      location: "FPT University - Hanoi",
      address: "Hoa Lac Hi-Tech Park\nThach That, Hanoi",
      email: "contact@fpt.edu.vn",
      phone: "+84 (24) 7300-1866",
    },
    {
      location: "FPT University - Ho Chi Minh City",
      address: "Khu Cong nghe cao\nLong Thanh My Ward, District 9, HCMC",
      email: "contact@fpt.edu.vn",
      phone: "+84 (28) 7300-1866",
    },
    {
      location: "FPT University - NVH Sinh Vien",
      address: "Luu Huu Phuoc Tan Lap, Dong Hoa, Di An, Binh Duong",
      email: "contact@fpt.edu.vn",
      phone: "+84 (256) 7300-1866",
    },
    {
      location: "FPT University - Da Nang",
      address: "Hoa Hai Ward\nNgu Hanh Son District, Da Nang",
      email: "contact@fpt.edu.vn",
      phone: "+84 (236) 7300-1866",
    },
    {
      location: "FPT University - Can Tho",
      address: "Lot 6-10, Street 902\nCai Rang, Can Tho",
      email: "contact@fpt.edu.vn",
      phone: "+84 (292) 7300-1866",
    },
    {
      location: "FPT University - Quy Nhon",
      address: "Zone 2, Ghenh Rang Ward\nQuy Nhon, Binh Dinh",
      email: "contact@fpt.edu.vn",
      phone: "+84 (256) 7300-1866",
    },
  ];
  

  return (
    <div className="flex items-center justify-center py-16 bg-white h-screen">
  <div className="max-w-screen-xl max-h-screen mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h5 className="text-xl font-bold text-purple-600">Locations</h5>
      <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
        Our Offices
      </h2>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
        We blend the timeless principles of Feng Shui with the elegance of koi fish to bring harmony, prosperity, and tranquility to your home or business.
      </p>
    </div>

    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {offices.map((office, index) => (
        <div key={index} className="text-center lg:text-left">
          <h3 className="text-lg font-semibold text-gray-800">
            {office.location}
          </h3>
          <p className="mt-2 text-gray-600 whitespace-pre-line">
            {office.address}
          </p>
          <p className="mt-2 text-blue-600">{office.email}</p>
          <p className="mt-1 text-gray-600">{office.phone}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default ContactUsDetails;
