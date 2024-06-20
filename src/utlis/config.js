// const config = {
//     token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGZlMTc4MjMyMzIwNmVmMjViOWJiOSIsImlhdCI6MTcxMjcyNjc5MywiZXhwIjoxNzEyOTg1OTkzfQ.r2x3N7vbzVn6lHpLhWYRa6F7uOBw_kRB75fh4wri-p8",
//   };

//   export default config;

// const accessToken = JSON.parse(localStorage.getItem("accessToken"));
// export const headers = {
//   Authorization: `Bearer ${accessToken}`,
//   "Content-Type": "multipart/form-data",
// };

// export const header = {
//   Authorization: `Bearer ${accessToken}`,
// };

const accessToken = JSON.parse(localStorage.getItem("accessToken"));

export const headers = {
  Authorization: `Bearer ${accessToken}`,
  ...(shouldIncludeContentType() && { "Content-Type": "multipart/form-data" }),
};

function shouldIncludeContentType() {
  return accessToken ? false : true;
  // Logic to determine whether to include "Content-Type" header
  // For example, you could check the endpoint or some other condition
  // For simplicity, let's assume you always include it
}
