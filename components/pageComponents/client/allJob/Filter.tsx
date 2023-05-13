import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import MultiRadio from '@/components/common/MultiRadio';
import H4 from '@/components/common/Text/H4';

const fieldFilters = {
  visibility: [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Invite-only',
      value: 'invite-only',
    },
    {
      label: 'Public',
      value: 'public',
    },
  ],
  status: [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Draft',
      value: 'draft',
    },
    {
      label: 'Open',
      value: 'open',
    },
    {
      label: 'Filed',
      value: 'filed',
    },
    {
      label: 'Closed',
      value: 'closed',
    },
  ],
  types: [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Fixed-price',
      value: 'fixed-price',
    },
    {
      label: 'Hourly',
      value: 'hourly',
    },
  ],
};

interface FilterProps {
  showFilter: boolean;
}

const Filter = ({ showFilter }: FilterProps) => {
  const initialValues = {
    visibility: 'all',
    status: 'all',
    types: 'all',
  };
  const handleSubmit = (values: any) => {
    // const {agreement,sendEmail,...newValue} = values
    // dispatch(register(newValue));
  };

  const containerRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   const containerHeight = container.clientHeight;
  //   container.style.height = containerHeight.toString();
  // }, [showFilter]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden transition-all duration-1000 ${showFilter ? 'h-72' : 'h-0'}`}>
      <div className={`bg-[color:var(--primary-3)] w-full rounded-md py-8 px-8 h-full`}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validateOnChange={false}
        >
          {(formikProps) => {
            const { values, setFieldValue, errors, touched } = formikProps;
            console.log(values, errors, touched);
            return (
              <div className="w-full flex gap-20">
                <div>
                  <H4>Visibility</H4>
                  <div>
                    <MultiRadio value={fieldFilters.visibility[0].value} options={fieldFilters.visibility} />
                  </div>
                </div>
                <div>
                  <H4>Status</H4>
                  <div>
                    <MultiRadio value={fieldFilters.status[0].value} options={fieldFilters.status} />
                  </div>
                </div>
                <div>
                  <H4>Status</H4>
                  <div>
                    <MultiRadio value={fieldFilters.types[0].value} options={fieldFilters.types} />
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Filter;
