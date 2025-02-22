// components
import Spring from "@components/Spring";

// data placeholder
import sellers from "@db/sellers";

const SellerProfilePreview = ({ seller = sellers[3] }) => {
  return (
    <Spring className="card !p-5 flex flex-col gap-5 md:flex-row md:items-center md:gap-10 md:col-span-2">
      <div className="img-wrapper h-[137px] flex justify-center items-center md:w-[168px] shrink-0">
        <img className="max-w-[120px]" src={seller.logo} alt={seller.name} />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="mb-3 truncate">{seller.name}</h3>

        <a className="mt-[14px] mb-2" href={`tel:${seller.phone}`}>
          {seller.phone}
        </a>
        <a href={`mailto:${seller.email}`}>{seller.email}</a>
      </div>
    </Spring>
  );
};

export default SellerProfilePreview;
