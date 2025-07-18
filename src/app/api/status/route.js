import { ApiResponse } from "@/utils/ApiResponse";

export async function GET(req) {
    return Response.json(new ApiResponse(200, "OK"), { status: 200 });
}
