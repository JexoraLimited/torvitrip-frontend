const SearchAndHotelBooking = ({
  setOpenedPopup,
  openedPopup,
}: {
  setOpenedPopup: any;
  openedPopup: any;
}) => {
  return (
    <div>
      <div>
        {openedPopup === true ? (
          ""
        ) : (
          <div className="main-container pt-[77px]">
            <div
              style={{ boxShadow: "0px 0px 28px 2px rgba(0, 0, 0, 0.12)" }}
              className="flex items-center justify-between p-3 rounded-lg bg-[#FFF]"
            >
              <h1 className="text-[#30303C] text-[32px] font-extrabold font-['Nunito Sans']">
                All Hotel Booking
              </h1>
              <button
                onClick={() => {
                  setOpenedPopup(true);
                }}
                className="text-xl font-bold text-[#FFF] px-[50px] py-[20px] rounded-lg bg-[#1882FF]"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndHotelBooking;
