import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wsndwzaphwkfcwaoeewq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Bceqayn5pxpNQw_ShSN-JQ_wNGmQxdR";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
