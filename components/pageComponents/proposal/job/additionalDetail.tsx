import InputFileField from "@/components/common/InputFileField";
import TextareaField from "@/components/common/TextareaField";
import { IApplyJobForm } from "@/interfaces";
import { useAppDispatch } from "@/stores/hooks";
import { getFileLink } from "@/stores/slices/jobs/jobsSlide";
import { JobService } from "@/utils/services/jobService";
import { FastField, useFormikContext } from "formik";
import { useState } from "react";
import { IoIosAttach } from "react-icons/io";

export interface AdditionalDetailProps {}

export default function AdditionalDetail(props: AdditionalDetailProps) {
  const [imageLists, setImageLists] = useState<any>([]);
  const { values, errors, touched, setFieldValue } =
    useFormikContext<IApplyJobForm>();
  return (
    <section className="px-8 py-4 border rounded-2xl">
      <h6 className="text-2xl font-medium mb-12"> Additional detail</h6>
      <div>
        <h6 className="font-medium mb-3">Cover Letter</h6>
        <FastField
          component={TextareaField}
          name="coverLetter"
          rows={8}
          placeholder=""
          title=""
        />
        <span className="text-[color:var(--red-err)] font-medium"></span>
      </div>
      <div className="mt-6">
        <h6 className="font-medium mb-3">Attachments</h6>
        <div className="my-6">
          {imageLists.map((item: File, index: number) => (
            <div className="flex item-center space-x-2" key={index}>
              <IoIosAttach size={20} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <FastField
          component={InputFileField}
          name="attachments"
          placeholder=""
          className="mt-4 md:mt-0"
          inputClassName="px-2"
          onChange={async (e: FileList) => {
            const fileLists = [];
            //@ts-ignore
            for (const file of e) {
              fileLists.push(file);
            }
            setImageLists(fileLists);
          }}
        />
      </div>
    </section>
  );
}
