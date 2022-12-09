import { useEffect, useState } from "react";
import { confirmAccount } from "../../shared/APIs/userService";

export const useConfirmAccountHandler = (token: string) => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const confirm = async () => {
      try {
        setLoading(true);
        await confirmAccount(token);
        setConfirmed(true);
      } catch (e) {
        setConfirmed(false);
      } finally {
        setLoading(false);
      }
    };
    confirm();
  }, []);

  return { confirmed, loading };
};
