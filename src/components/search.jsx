import React, { useContext, useState } from "react";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { List, ListItem, Flex, Divider, Text, Image } from "@chakra-ui/react";
import locationImage from "/location.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SelectContext } from "../context/SelectContext";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const SearchBox = (props) => {
  const { setSelected } = useContext(SelectContext);
  // const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListPlace(JSON.parse(result));
        console.log("queryString", queryString);
        setDropdownOpen(true); // Open the dropdown when results are fetched
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleSelect = (item) => {
    // setSelectPosition(item);
    setSelected(item);
    navigate(`/all-reports?position=${encodeURIComponent(searchText)}`);
    setDropdownOpen(false); // Close the dropdown on item selection
  };

  // useEffect(() => {
  //   if (queryString) {
  //     console.log("queryString", queryString);
  //   }
  // }, [searchText]);

  return (
    <>
      <div className=" flex relative w-full">
        <InputGroup size="xl" h="3rem" fontWeight={600}>
          <Input
            type="text"
            placeholder="Enter a location"
            bg="bg-white"
            color="#00BE7A"
            border="2px"
            borderRadius="4px"
            px="1rem"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <InputRightAddon
            w="6rem"
            bg="#00BE7A"
            color="white"
            pl=".75rem"
            border="2px"
            borderRadius="4px"
            px="1rem"
            className="cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </InputRightAddon>
        </InputGroup>
        {dropdownOpen && (
          <div
            className="flex  absolute  bg-light text-sm"
            style={{
              top: "100%",
              left: 0,
              zIndex: 20,
            }}
          >
            <List spacing={0} borderWidth="1px" borderRadius="md">
              {listPlace.map((item) => (
                <div key={item?.place_id}>
                  <ListItem
                    onClick={() => {
                      handleSelect(item);
                    }}
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Flex align="center" p={1}>
                      <Image
                        src={locationImage}
                        alt="location"
                        boxSize={38}
                        borderRadius="md"
                      />
                      <Text ml={2} fontWeight="bold">
                        {item?.display_name}
                      </Text>
                    </Flex>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBox;
