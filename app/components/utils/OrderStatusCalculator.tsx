import { Order } from "../../types";

export const OrderStatusCalculator = (order: Order) => {
  return (
    <>
      {order?.processes?.length ? null : (
        <p className=" text-xs text-secondary"> جدید </p>
      )}
      {order?.processes?.length == 1 && order.processes[0].status == "I" ? (
        <p className=" text-xs text-accent"> درحال تولید</p>
      ) : null}
      {order?.processes?.length == 2 &&
      order.processes[0].status == "I" &&
      order.processes[1].status == "R" ? (
        <p className=" text-xs text-info"> آماده ارسال</p>
      ) : null}
      {order?.processes?.length == 3 &&
      order.processes[0].status == "I" &&
      order.processes[1].status == "R" &&
      order.processes[2].status == "D" ? (
        <p className=" text-xs text-success">ارسال شده</p>
      ) : null}
    </>
  );
};

export const OrderNextStatusCalculator = (order: Order) => {
  return (
    <>
      {order?.processes?.length ? null : (
        <p className=" text-xs"> درحال تولید</p>
      )}
      {order?.processes?.length == 1 && order.processes[0].status == "I" ? (
        <p className=" text-xs"> آماده ارسال</p>
      ) : null}
      {order?.processes?.length == 2 &&
      order.processes[0].status == "I" &&
      order.processes[1].status == "R" ? (
        <p className=" text-xs">ارسال شده</p>
      ) : null}
      {/* {order?.processes?.length == 3 &&
      order.processes[0].status == "I" &&
      order.processes[1].status == "R" &&
      order.processes[2].status == "D" ? (
        <p className=" text-xs">ارسال شده</p>
      ) : null} */}
    </>
  );
};
