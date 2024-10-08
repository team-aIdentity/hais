import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../components/firebase/firebase";
import { useContext, useEffect, useState } from "react";
import AdminContext from "../../../../../components/context/AdminContext";
import useGetDocs from "../../../../../hooks/useGetDocs";
import useAddDoc from "../../../../../hooks/useAddDoc";
import useSetDoc from "../../../../../hooks/useSetDoc";
import useDeleteDoc from "../../../../../hooks/useDeleteDoc";

const getMajor = async (value) => {
  const majorList = [];
  const majorQuery = query(
    collection(db, "majors"),
    where("univ", "==", `${value}`)
  );
  const majorSnapShot = await getDocs(majorQuery);
  majorSnapShot.docs.forEach((doc) => majorList.push(doc.data()));
  majorSnapShot.docs.forEach(
    (doc, index) => (majorList[index] = { ...majorList[index], id: doc.id })
  );
  return majorList;
};

export const getInputList = () => {
  const { univ } = useContext(AdminContext);
  const [currentUniv, setCurrentUniv] = useState(null);
  const [majorList, setMajorList] = useState(null);
  const [subjectList, setSubjectList] = useState([]);

  const getMajorHandle = async (univData) => {
    const majorList = await getMajor(univData.name);

    if (majorList == undefined) return;

    setMajorList(majorList);
    setCurrentUniv(univData);
  };

  const addMajorDB = async (_data) => {
    const data = {
      _specification: "대학",
      department: "대학",
      investigation_year: 2022,
      name: _data.majors,
      sido_code: currentUniv.sido_code,
      status: "ACTIVE",
      std_lclsf_name: _data.std_lclsf_name,
      std_mclsf_name: _data.std_mclsf_name,
      std_sclsf_name: _data.std_sclsf_name,
      univ: currentUniv.name,
    };

    try {
      await useAddDoc("majors", data);
      alert("학과 추가 되었습니다");
      getMajorHandle(currentUniv);
    } catch (e) {
      alert("알 수 없는 오류 입니다");
      console.log("Error Add Data >>>>> " + e);
    }
  };

  const addSubjectDB = async (_data) => {
    let subjectLength = subjectList.length + 878;

    const data = {
      category: _data.category,
      code: subjectLength.toString(),
      credit_amount: 0,
      description: _data.description,
      difficulty: 5,
      etc_info: _data.etc_info,
      group: _data.group,
      name: _data.name,
      student_category: "NONE",
      suneung_info: "수능 출제 과목 아님",
    };

    try {
      await useSetDoc("optional_subject", subjectLength.toString(), data);
      await getSubject();
      alert("과목 추가 되었습니다");
    } catch (e) {
      alert("알 수 없는 오류 입니다");
      console.log("Error Add Data >>>>> " + e);
    }
  };

  const majorSubmit = (data) => {
    // const { majors, std_lclsf_name, std_mclsf_name, std_sclsf_name } = data;

    // const regex = /^[가-힣a-zA-Z\s]+$/;
    // const validLclsf = regex.test(std_lclsf_name);
    // const validMclsf = regex.test(std_mclsf_name);
    // const validSclsf = regex.test(std_sclsf_name);

    // switch (true) {
    //   case !validLclsf:
    //     break;
    //   case !validMclsf:
    //     break;
    //   case !validSclsf:
    //     break;
    //   default:
    //     console.log("Complete Input Add Data");
    return addMajorDB(data);
    // }

    // return alert("빈칸을 입력해주세요 (특수문자 제외)");
  };

  const subjectSubmit = (data) => {
    // const { category, description, etc_info, group, name } = data;

    // const regex = /^[가-힣a-zA-Z\s]+$/;

    // const validCategory = regex.test(category);
    // const validDescription = regex.test(description);
    // const validEtc_info = regex.test(etc_info);
    // const validGroup = regex.test(group);
    // const validName = regex.test(name.name);

    // switch (true) {
    //   case !validCategory:
    //     break;
    //   case !validDescription:
    //     break;
    //   case !validEtc_info:
    //     break;
    //   case !validGroup:
    //     break;
    //   case !validName:
    //     break;
    //   default:
    //     console.log("Complete Input Add Data");
    return addSubjectDB(data);
    // }

    // return alert("빈칸을 입력해주세요 (특수문자 제외)");
  };

  const getSubject = async () => {
    const subjectTypeData = await useGetDocs("optional_subject");
    let subjectType = [];
    subjectTypeData.forEach((data) => subjectType.push(data));

    setSubjectList(subjectType);
  };

  const deleteMajor = async (data) => {
    if (confirm("정말로 삭제하겠습니까? 학과:" + data.name)) {
      try {
        await useDeleteDoc(`majors/${data.id}`);
        alert("학과가 삭제되었습니다");
        getMajorHandle(currentUniv);
      } catch (e) {
        alert("알 수 없는 오류가 발생했습니다");
        console.log("Error >>>>> ", e);
      }
    } else {
      return;
    }
  };

  const deleteSubject = async (data) => {
    if (confirm("정말로 삭제하겠습니까? 과목:" + data.name)) {
      try {
        await useDeleteDoc(`optional_subject/${data.code}`);
        alert("과목이 삭제되었습니다");
        await getSubject();
      } catch (e) {
        alert("알 수 없는 오류가 발생했습니다");
        console.log("Error >>>>> ", e);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  return [
    {
      title: "학과 추가",
      defaultList: majorList,
      onSubmit: majorSubmit,
      deleteHandle: deleteMajor,
      firstInput: {
        title: "대학",
        value: "univ",
        type: "select",
        optionList: univ,
        onChange: (e) => getMajorHandle(univ[Number(e.target.value)]),
      },
      list: [
        {
          title: "학과",
          value: "majors",
          type: "input",
          placeholder: "기계공학부",
          require: true,
        },
        {
          title: "계열",
          value: "std_lclsf_name",
          type: "input",
          placeholder: "공학계열",
          require: true,
        },
        {
          title: "분야",
          value: "std_mclsf_name",
          type: "input",
          placeholder: "기계",
          require: true,
        },
        {
          title: "목적",
          value: "std_sclsf_name",
          type: "input",
          placeholder: "기계공학",
          require: true,
        },
      ],
    },
    {
      title: "과목 추가",
      defaultList: subjectList,
      deleteHandle: deleteSubject,
      onSubmit: subjectSubmit,
      list: [
        {
          title: "학과명",
          value: "name",
          type: "input",
          placeholder: "통합 수학",
          require: true,
        },
        {
          title: "카테고리",
          value: "category",
          type: "input",
          placeholder: "일반선택",
          require: true,
        },
        {
          title: "세부설명",
          value: "description",
          type: "input",
          placeholder: "과목의 세부설명을 입력해 주세요",
          require: true,
        },
        {
          title: "그룹",
          value: "group",
          type: "input",
          placeholder: "수학",
          require: true,
        },
        {
          title: "기타 설명",
          value: "etc_info",
          type: "input",
          placeholder: "과목의 기타 설명을 입력해 주세요",
          require: true,
        },
      ],
    },
  ];
};
