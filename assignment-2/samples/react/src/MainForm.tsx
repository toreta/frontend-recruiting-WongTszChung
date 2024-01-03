import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" })
    .min(1, { message: "メールアドレスを入力してください" }),
  zip: z
    .string()
    .min(1, { message: "郵便番号を入力してください" })
    .max(7, { message: "正しい郵便番号を入力してください" })
    .length(7, { message: "正しい郵便番号を入力してください" })
    .regex(/^[0-9]+$/, {
      message: "ハイフンを含めず半角数字で入力してください",
    }),

  prefecture: z.string().min(1, { message: "都道府県を選択してください" }),
  address1: z.string().min(1, { message: "市区町村・番地を入力してください" }),
  address2: z.string(),
});

type Schema = z.infer<typeof schema>;

type FieldArr = {
  name: keyof Schema;
  label: string;
  placeholder: string;
};

const fields: FieldArr[] = [
  {
    name: "name",
    label: "名前",
    placeholder: "(例)トレタ太郎",
  },
  {
    name: "email",
    label: "Eメール",
    placeholder: "(例)yoyaku@toreta.in",
  },
  {
    name: "zip",
    label: "郵便番号",
    placeholder: "(例)0000000",
  },
  {
    name: "prefecture",
    label: "都道府県",
    placeholder: "選択してください",
  },
  {
    name: "address1",
    label: "市区町村",
    placeholder: "(例)品川区西五反田7丁目22-17",
  },
  {
    name: "address2",
    label: "建物名・号室",
    placeholder: "(例)TOCビル 8F",
  },
];

const prefectures: string[] = [
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄",
];

export default function MainForm() {
  const [selected, setSelected] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      zip: "",
      prefecture: "",
      address1: "",
      address2: "",
    },
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 pb-10 flex flex-col  w-[400px] shadow-lg bg-white  text-base"
    >
      {fields.map((field) => (
        <div className="flex mb-4" key={field.name}>
          <label
            htmlFor={field.name}
            className="w-[30%] text-end mr-2 font-semibold mt-1"
          >
            {field.label}
          </label>
          <div className="flex-1 text-sm">
            {field.name === "prefecture" ? (
              <div className="select-wrapper">
                <select
                  {...register(field.name)}
                  className={clsx(
                    "w-full py-1 px-2 rounded-md border focus:outline-none cursor-pointe appearance-none",
                    errors[field.name] ? "border-red-500" : "border-gray-300",
                    !selected && "text-gray-400"
                  )}
                  onChange={() => {
                    setSelected(true);
                  }}
                >
                  <option value="" disabled className="hidden">
                    {field.placeholder}
                  </option>
                  {prefectures.map((p) => (
                    <option className="text-black" key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                className={clsx(
                  "p-2 rounded-md border border-gray-300 focus:outline-none",
                  field.name === "zip" ? "w-[50%]" : "w-full",
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                )}
                {...register(field.name)}
                placeholder={field.placeholder}
              />
            )}

            {errors[field.name] && (
              <p className="py-1 text-xs text-red-500 font-semibold">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        </div>
      ))}
      <button
        disabled={!isDirty || !isValid}
        type="submit"
        className={clsx(
          "bg-green-500 w-32 rounded-lg px-4 py-3 self-center text-white focus:scale-95",
          (!isDirty || !isValid) && "opacity-50"
        )}
      >
        登録
      </button>
    </form>
  );
}
