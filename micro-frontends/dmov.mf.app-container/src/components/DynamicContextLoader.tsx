import React, { useEffect, useState } from 'react';
import  Parcel  from 'single-spa-react/parcel';

interface DynamicContextLoaderProps {
  context: string;
}

const DynamicContextLoader: React.FC<DynamicContextLoaderProps> = ({ context }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
		setLoading(true);
		System.import(context).finally(() => {
			setLoading(false);
		});
	}, [context]);


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Parcel
          // @ts-expect-error
          config={() => System.import(context)}
        />
      )}
    </>
  );

  // return parcelConfig ? <Parcel config={parcelConfig.config} /> : null;
};

export default DynamicContextLoader;