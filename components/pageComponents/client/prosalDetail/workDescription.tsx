import ButtonIcon from "@/components/common/ButtonIcon";
import InputField from "@/components/common/InputField";
import InputFileField from "@/components/common/InputFileField";
import TextLink from "@/components/common/Text/TextLink";
import TextareaField from "@/components/common/TextareaField";
import { IOfferForm } from "@/interfaces";
import { FastField, useFormikContext } from "formik";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";

export interface WorkDescriptionProps {}

export default function WorkDescription(props: WorkDescriptionProps) {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<IOfferForm>();
  const [fileLists, setFileLists] = useState<any>([]);
  const [showEditTitle, setShowEditTitle] = useState<boolean>(false);
  const [showEditDescription, setShowEditDescription] =
    useState<boolean>(false);
  return (
    <div className="w-full px-8 py-6 border rounded-xl text-black">
      <h6 className="text-xl font-semibold mb-8">Work Description</h6>
      <div className="py-3">
        <p className="font-medium">Related Job Listing</p>
        <div className="py-3 flex items-center space-x-1">
          <TextLink>I Need build an E-commerce website with MERN</TextLink>
          <p>(#100123123)</p>
        </div>
      </div>
      <div className="py-3">
        <p className="font-medium">Contract Title</p>
        <div className="py-3 flex items-center space-x-2">
          {showEditTitle ? (
            <div className="w-full">
              <FastField
                component={InputField}
                name="title"
                title=""
                placeholder=""
                className="mt-4 md:mt-0"
                inputClassName="h-[40px] px-2 text-medium"
              />
            </div>
          ) : (
            <>
              <p>I Need build an E-commerce website with MERN</p>
              <ButtonIcon
                icon={<MdModeEditOutline size={21} />}
                onClick={() => setShowEditTitle(true)}
              />
            </>
          )}
        </div>
      </div>
      <div className="py-3">
        <p className="font-medium">Add a description of the work</p>
        <div className="py-3 flex items-center space-x-2">
          {showEditDescription ? (
            <div className="w-full">
              <FastField
                component={TextareaField}
                name="description"
                rows={8}
                placeholder="Already have a description? Paste it here!"
              />
            </div>
          ) : (
            <p>
              I Need build an E-commerce website with MERN{" "}
              <ButtonIcon
                icon={<MdModeEditOutline size={21} />}
                onClick={() => setShowEditDescription(true)}
              />
            </p>
          )}
        </div>
      </div>
      <div className="py-3">
        <div className="my-6">
          {fileLists.map((item: File, index: number) => (
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
          className="my-4 md:mt-0"
          inputClassName="px-2"
          onChange={async (e: FileList) => {
            const fileLists = [];
            //@ts-ignore
            for (const file of e) {
              fileLists.push(file);
            }
            setFileLists(fileLists);
          }}
        />
        <span className="text-sm text-[color:var(--gray-7)] mt-4">
          Max file size:25MB
        </span>
      </div>
    </div>
  );
}
